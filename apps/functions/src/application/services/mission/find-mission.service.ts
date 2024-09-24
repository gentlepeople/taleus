import { Inject, Injectable } from '@nestjs/common';

import { Mission } from '@/domain';
import { MISSION_REPOSITORY, FindMissionUsecase, IMissionRepository } from '@/ports';

@Injectable()
export class FindMissionService implements FindMissionUsecase {
  constructor(
    @Inject(MISSION_REPOSITORY)
    private readonly missionRepository: IMissionRepository,
  ) {}

  async findOneByMissionId(missionId: bigint): Promise<Mission | null> {
    const findMission = await this.missionRepository.findOneByMissionId(missionId);
    return findMission;
  }
}
