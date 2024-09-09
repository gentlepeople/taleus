import { Inject, Injectable } from '@nestjs/common';

import {
  COUPLE_MISSION_REPOSITORY,
  FindCoupleMissionUsecase,
  ICoupleMissionRepository,
} from '@/ports';

@Injectable()
export class FindCoupleMissionService implements FindCoupleMissionUsecase {
  constructor(
    @Inject(COUPLE_MISSION_REPOSITORY)
    private readonly coupleMissionRepository: ICoupleMissionRepository,
  ) {}

  async countCompletedByCoupleId(coupleId: number): Promise<number> {
    const countCompleteMissions = await this.coupleMissionRepository.countCompletedByCoupleId(
      coupleId,
    );
    return countCompleteMissions;
  }
}
