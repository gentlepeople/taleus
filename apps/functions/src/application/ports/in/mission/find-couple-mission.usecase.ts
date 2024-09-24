import { CoupleMission, Mission, Question } from '@/domain';

export const FIND_COUPLE_MISSION_USECASE = Symbol('FIND_COUPLE_MISSION_USECASE');

export interface FindCoupleMissionUsecase {
  countCompletedByCoupleId(coupleId: bigint): Promise<number>;
  findCompletedByUserId(
    userId: string,
    options: {
      shuffle: boolean;
      pagination: {
        take: number;
        skip: number;
      };
    },
  ): Promise<(CoupleMission & { mission: Mission & { question: Question[] } })[]>;
}
