import { Question } from '@/domain';

export const QUESTION_REPOSITORY = Symbol('QUESTION_REPOSITORY');

export interface IQuestionRepository {
  findManyByMissionId(missionId: bigint): Promise<Question[]>;
  countByMissionId(missionId: bigint): Promise<number>;
}
