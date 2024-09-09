import { CoupleMission, Mission, Question } from '@/domain';

export const FIND_COUPLE_MISSION_USECASE = Symbol('FIND_COUPLE_MISSION_USECASE');

export interface FindCoupleMissionUsecase {
  countCompletedByCoupleId(coupleId: number): Promise<number>;
  findCompletedByUserId(
    userId: string,
    pagination: {
      take: number;
      skip: number;
    },
  ): Promise<(CoupleMission & { mission: Mission & { question: Question[] } })[]>;
}
