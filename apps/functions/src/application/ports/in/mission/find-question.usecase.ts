import { Question } from '@/domain';

export const FIND_QUESTION_USECASE = Symbol('FIND_QUESTION_USECASE');

export interface FindQuestionUsecase {
  findManyByMissionId(missionId: number): Promise<Question[]>;
  countByMissionId(missionId: number): Promise<number>;
}
