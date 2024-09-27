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
} from '@/ports';
import { EnumPushNotificationTemplate } from '@/providers';

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
  ) {}

  async execute(event: { scheduleTime: string }): Promise<number> {
    try {
      const eventScheduleTime = this.timePort.dayjs(event.scheduleTime);
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
        logger.log(
          `ScheduleDailyMissionService.execute: ${coupleMissionsToCreate.length} created.`,
        );
        await this.coupleMissionRepository.createMany(coupleMissionsToCreate);

        await this.pushNotificationPort.send(
          Array.from(userIds),
          EnumPushNotificationTemplate.DAILY_MISSION_ALARM,
          {},
        );
        return coupleMissionsToCreate.length;
      }
      return 0;
    } catch (e) {
      throw new Error(`Error ScheduleDailyMissionService: ${e}`);
    }
  }
}
