import { CoupleMission, Mission, Question } from '@/domain';

export const COUPLE_MISSION_REPOSITORY = Symbol('COUPLE_MISSION_REPOSITORY');

export interface ICoupleMissionRepository {
  createMany(
    data: {
      coupleId: number;
      missionId: number;
    }[],
  ): Promise<number>;
  countCompletedByCoupleId(coupleId: number): Promise<number>;
  getOngoingOneByUserId(userId: string): Promise<CoupleMission | null>;
  findManyCompletedByUserIdSortByCreatedAtDesc(
    userId: string,
    pagination: { take: number; skip: number },
  ): Promise<(CoupleMission & { mission: Mission & { question: Question[] } })[]>;
}
