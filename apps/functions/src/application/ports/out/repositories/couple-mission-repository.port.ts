import { CoupleMission, Mission, Question } from '@/domain';

export const COUPLE_MISSION_REPOSITORY = Symbol('COUPLE_MISSION_REPOSITORY');

export interface ICoupleMissionRepository {
  findOneByCoupleMissionId(coupleMissionId: bigint): Promise<CoupleMission | null>;
  findOneIncludingQuestionByCoupleMissionId(
    coupleMissionId: bigint,
  ): Promise<(CoupleMission & { mission: Mission & { question: Question[] } }) | null>;
  createMany(
    data: {
      coupleId: bigint;
      missionId: bigint;
    }[],
  ): Promise<number>;
  countCompletedByCoupleId(coupleId: bigint): Promise<number>;
  countCompletedByUserId(userId: string): Promise<number>;
  findLatestOneByUserId(userId: string): Promise<CoupleMission | null>;
  findManyCompletedByUserIdSortByCreatedAtDesc(
    userId: string,
    pagination: { take: number; skip: number },
  ): Promise<(CoupleMission & { mission: Mission & { question: Question[] } })[]>;
  findManyCompletedByUserIdSortByHashKey(
    userId: string,
    pagination: { take: number; skip: number },
  ): Promise<(CoupleMission & { mission: Mission & { question: Question[] } })[]>;
  updateToCompleted(coupleMissionId: bigint): Promise<void>;
}
