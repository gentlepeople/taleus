import { Inject, Injectable } from '@nestjs/common';
import { logger } from 'firebase-functions/v2';

import { randomElement } from '../../../common';

import {
  COUPLE_MISSION_REPOSITORY,
  COUPLE_REPOSITORY,
  ICoupleMissionRepository,
  ICoupleRepository,
  IMissionRepository,
  MISSION_REPOSITORY,
  TIME_PORT,
  TimePort,
} from '@/ports';

@Injectable()
export class ScheduleDailyMissionService {
  constructor(
    @Inject(COUPLE_REPOSITORY)
    private readonly coupleRepository: ICoupleRepository,
    @Inject(MISSION_REPOSITORY)
    private readonly missionRepository: IMissionRepository,
    @Inject(COUPLE_MISSION_REPOSITORY)
    private readonly coupleMissionRepository: ICoupleMissionRepository,
    @Inject(TIME_PORT)
    private readonly timePort: TimePort,
  ) {}

  async execute(): Promise<void> {
    try {
      logger.log(`ScheduleDailyMissionService.execute: created.`);
      const currentTime = this.timePort.get();
      const currentHour = currentTime.getHours();
      const currentMinute = currentTime.getMinutes();
      const findCouples =
        await this.coupleRepository.findManyWithoutActiveMissionsByNotificationTime(
          currentHour,
          currentMinute,
        );

      const coupleWithCompletedMissionsMap = new Map<number, number[]>();
      findCouples.forEach(({ coupleId, coupleMission }) => {
        coupleWithCompletedMissionsMap.set(
          coupleId,
          coupleMission.map(({ missionId }) => missionId),
        );
      });
      const allMissions = await this.missionRepository.findAll();

      const coupleMissionsToCreate: { coupleId: number; missionId: number }[] = [];

      findCouples.forEach(({ coupleId, coupleMission }) => {
        const completedMissions = coupleMission.map(({ missionId }) => missionId);

        const incompleteMissions = allMissions.filter(
          (mission) => !completedMissions.includes(mission.missionId),
        );

        if (incompleteMissions.length > 0) {
          const randomMission = randomElement(incompleteMissions);
          coupleMissionsToCreate.push({
            coupleId,
            missionId: randomMission.missionId,
          });
        }
      });

      if (coupleMissionsToCreate.length > 0) {
        logger.log(
          `ScheduleDailyMissionService.execute: ${coupleMissionsToCreate.length} created.`,
        );
        await this.coupleMissionRepository.createMany(coupleMissionsToCreate);
      }
    } catch (e) {
      logger.error(e);
    }
  }
}
