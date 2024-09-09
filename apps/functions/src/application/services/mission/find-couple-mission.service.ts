import { Inject, Injectable } from '@nestjs/common';

import { CoupleMission, Mission, Question } from '@/domain';
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

  async findCompletedByUserId(
    userId: string,
    options: {
      shuffle: boolean;
      pagination: {
        take: number;
        skip: number;
      };
    },
  ): Promise<(CoupleMission & { mission: Mission & { question: Question[] } })[]> {
    const { shuffle, pagination } = options;
    let findCompletedCoupleMissions = null;

    if (shuffle) {
      findCompletedCoupleMissions =
        await this.coupleMissionRepository.findManyCompletedByUserIdSortByHashKey(
          userId,
          pagination,
        );
    } else {
      findCompletedCoupleMissions =
        await this.coupleMissionRepository.findManyCompletedByUserIdSortByCreatedAtDesc(
          userId,
          pagination,
        );
    }
    return findCompletedCoupleMissions;
  }
}
