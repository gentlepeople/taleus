import { Question } from '@/domain';

export const FIND_QUESTION_USECASE = Symbol('FIND_QUESTION_USECASE');

export interface FindQuestionUsecase {
  findManyByMissionId(missionId: bigint): Promise<Question[]>;
  countByMissionId(missionId: bigint): Promise<number>;
}
