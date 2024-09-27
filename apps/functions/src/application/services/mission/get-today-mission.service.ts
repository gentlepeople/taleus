import { Inject, Injectable } from '@nestjs/common';
import isNull from 'lodash/isNull';

import { ONBOARDING_MISSION_ID } from '@/common';
import { CoupleMission, Mission } from '@/domain';
import {
  GetTodayMissionUsecase,
  IMissionRepository,
  MISSION_REPOSITORY,
  COUPLE_MISSION_REPOSITORY,
  ICoupleMissionRepository,
  COUPLE_REPOSITORY,
  ICoupleRepository,
} from '@/ports';

@Injectable()
export class GetTodayMissionService implements GetTodayMissionUsecase {
  constructor(
    @Inject(COUPLE_MISSION_REPOSITORY)
    private readonly coupleMissionRepository: ICoupleMissionRepository,
    @Inject(COUPLE_REPOSITORY)
    private readonly coupleRepository: ICoupleRepository,
    @Inject(MISSION_REPOSITORY)
    private readonly missionRepository: IMissionRepository,
  ) {}

  async execute(userId: string): Promise<{
    mission: Mission;
    coupleMission: CoupleMission | null;
  } | null> {
    const findCouple = await this.coupleRepository.findOneByUserId(userId);
    if (isNull(findCouple)) {
      const findOnboardingMission = await this.missionRepository.findOneByMissionId(
        ONBOARDING_MISSION_ID,
      );
      return {
        mission: findOnboardingMission,
        coupleMission: null,
      };
    }

    const findActiveCoupleMission = await this.coupleMissionRepository.findActiveOneByUserId(
      userId,
    );

    if (isNull(findActiveCoupleMission)) {
      return null;
    }
    const { missionId } = findActiveCoupleMission;
    const findTodayMission = await this.missionRepository.findOneByMissionId(missionId);
    return {
      mission: findTodayMission,
      coupleMission: findActiveCoupleMission,
    };
  }
}
