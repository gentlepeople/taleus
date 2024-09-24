import { Inject, Injectable } from '@nestjs/common';

import { Question } from '@/domain';
import { QUESTION_REPOSITORY, FindQuestionUsecase, IQuestionRepository } from '@/ports';

@Injectable()
export class FindQuestionService implements FindQuestionUsecase {
  constructor(
    @Inject(QUESTION_REPOSITORY)
    private readonly questionRepository: IQuestionRepository,
  ) {}

  async findManyByMissionId(missionId: bigint): Promise<Question[]> {
    const findQuestions = await this.questionRepository.findManyByMissionId(missionId);
    return findQuestions;
  }

  async countByMissionId(missionId: bigint): Promise<number> {
    const countQuestions = await this.questionRepository.countByMissionId(missionId);
    return countQuestions;
  }
}
