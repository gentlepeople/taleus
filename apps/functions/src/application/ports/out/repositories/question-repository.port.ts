import { Question } from '@/domain';

export const QUESTION_REPOSITORY = Symbol('QUESTION_REPOSITORY');

export interface IQuestionRepository {
  findManyByMissionId(missionId: number): Promise<Question[]>;
  countByMissionId(missionId: number): Promise<number>;
}
