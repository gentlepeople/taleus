import { Inject, Injectable } from '@nestjs/common';
import isNull from 'lodash/isNull';

import { CoupleMission, Mission } from '@/domain';
import {
  GetTodayMissionUsecase,
  IMissionRepository,
  MISSION_REPOSITORY,
  COUPLE_MISSION_REPOSITORY,
  ICoupleMissionRepository,
} from '@/ports';

@Injectable()
export class GetTodayMissionService implements GetTodayMissionUsecase {
  constructor(
    @Inject(COUPLE_MISSION_REPOSITORY)
    private readonly coupleMissionRepository: ICoupleMissionRepository,
    @Inject(MISSION_REPOSITORY)
    private readonly missionRepository: IMissionRepository,
  ) {}

  async execute(
    userId: string,
  ): Promise<{ mission: Mission; coupleMission: CoupleMission } | null> {
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
