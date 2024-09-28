import { Inject, Injectable } from '@nestjs/common';
import { logger } from 'firebase-functions/v2';
import isNull from 'lodash/isNull';

import {
  COUPLE_MISSION_REPOSITORY,
  COUPLE_REPOSITORY,
  ICoupleMissionRepository,
  ICoupleRepository,
  IMissionRepository,
  PUSH_NOTIFICATION_PORT,
  MISSION_REPOSITORY,
  TIME_PORT,
  TimePort,
  PushNotificationPort,
  ScheduleDailyMissionUsecase,
  SYSTEM_NOTIFICATION_PORT,
} from '@/ports';
import {
  EnumSystemNotificationMessageTarget,
  EnumPushNotificationTemplate,
  SystemNotificationAdapter,
} from '@/providers';

@Injectable()
export class ScheduleDailyMissionService implements ScheduleDailyMissionUsecase {
  constructor(
    @Inject(COUPLE_REPOSITORY)
    private readonly coupleRepository: ICoupleRepository,
    @Inject(MISSION_REPOSITORY)
    private readonly missionRepository: IMissionRepository,
    @Inject(COUPLE_MISSION_REPOSITORY)
    private readonly coupleMissionRepository: ICoupleMissionRepository,
    @Inject(TIME_PORT)
    private readonly timePort: TimePort,
    @Inject(PUSH_NOTIFICATION_PORT)
    private readonly pushNotificationPort: PushNotificationPort,
    @Inject(SYSTEM_NOTIFICATION_PORT)
    private readonly systemNotificationAdapter: SystemNotificationAdapter,
  ) {}

  async execute(event: { scheduleTime: string }): Promise<number> {
    const eventScheduleTime = this.timePort.dayjs(event.scheduleTime);
    try {
      const currentHour = eventScheduleTime.hour();
      const currentMinute = eventScheduleTime.minute();
      const findCouples =
        await this.coupleRepository.findManyRequiredMissionByNotificationTimeWithLatestCompletedMission(
          currentHour,
          currentMinute,
        );

      const allMissions = await this.missionRepository.findAll();
      const firstMissionId = allMissions.at(0).missionId;

      const userIds = new Set<string>();
      const coupleMissionsToCreate: { coupleId: bigint; missionId: bigint }[] = [];

      findCouples.forEach(({ coupleId, latestCoupleMission, inviteeId, inviterId }) => {
        userIds.add(inviteeId);
        userIds.add(inviterId);
        const missingMission = isNull(latestCoupleMission);
        if (missingMission) {
          coupleMissionsToCreate.push({
            coupleId,
            missionId: firstMissionId,
          });
        } else {
          const latestCoupleMissionIndex = allMissions.findIndex(
            ({ missionId }) => missionId === latestCoupleMission.missionId,
          );
          const nextCoupleMission = allMissions.at(
            (latestCoupleMissionIndex + 1) % allMissions.length,
          );
          coupleMissionsToCreate.push({
            coupleId,
            missionId: nextCoupleMission.missionId,
          });
        }
      });

      if (coupleMissionsToCreate.length > 0) {
        await this.coupleMissionRepository.createMany(coupleMissionsToCreate);

        await this.pushNotificationPort.send(
          Array.from(userIds),
          EnumPushNotificationTemplate.DAILY_MISSION_ALARM,
          {},
        );

        logger.log(
          `ScheduleDailyMissionService.execute: ${coupleMissionsToCreate.length} created.`,
        );

        await this.systemNotificationAdapter.send({
          target: EnumSystemNotificationMessageTarget.SCHEDULER,
          content: {
            status: 'LOG',
            title: '[SUCCESS] Mission(오늘의 질문) 배달 완료',
            data: [
              {
                dataTitle: 'Schedule Time',
                dataDescription: eventScheduleTime.format('YYYY년 MM월 DD일 HH시 mm분'),
              },
              {
                dataTitle: 'Couple Count',
                dataDescription: coupleMissionsToCreate.length,
              },
            ],
          },
        });

        return coupleMissionsToCreate.length;
      }
      return 0;
    } catch (e) {
      logger.error(
        `[FAILED] ScheduleDailyMissionService.execute at ${eventScheduleTime.format(
          'YYYY-MM-DDTHH:mm:ssZ[Z]',
        )} failed.`,
      );
      await this.systemNotificationAdapter.send({
        target: EnumSystemNotificationMessageTarget.SCHEDULER,
        content: {
          status: 'ERROR',
          title: '[FAILED] Mission(오늘의 질문) 배달 실패',
          data: [
            {
              dataTitle: 'Schedule Time',
              dataDescription: eventScheduleTime.format('YYYY년 MM월 DD일 HH시 mm분'),
            },
            {
              dataTitle: 'ERROR',
              dataDescription:
                'ScheduleDailyMissionService에서 문제가 발생했습니다. 수동으로 해당하는 데이터 확인 후 재실행바랍니다.',
            },
          ],
        },
      });
      throw new Error(`Error ScheduleDailyMissionService: ${e}`);
    }
  }
}
