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

  async findOneIncludingQuestionByCoupleMissionId(
    coupleMissionId: bigint,
  ): Promise<(CoupleMission & { mission: Mission & { question: Question[] } }) | null> {
    const findCoupleMission =
      await this.coupleMissionRepository.findOneIncludingQuestionByCoupleMissionId(coupleMissionId);
    return findCoupleMission;
  }

  async countCompletedByCoupleId(coupleId: bigint): Promise<number> {
    const countCompleteMissions = await this.coupleMissionRepository.countCompletedByCoupleId(
      coupleId,
    );
    return countCompleteMissions;
  }

  async countCompletedByUserId(userId: string): Promise<number> {
    const countCompletedMissions = await this.coupleMissionRepository.countCompletedByUserId(
      userId,
    );
    return countCompletedMissions;
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
