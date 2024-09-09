import { EnumResponseType, question } from '@gentlepeople/taleus-schema';
import { Injectable, Inject } from '@nestjs/common';
import isNull from 'lodash/isNull';

import { Question } from '@/domain';
import { DATABASE_PORT, DatabasePort, IQuestionRepository } from '@/ports';

@Injectable()
export class QuestionRepository implements IQuestionRepository {
  constructor(
    @Inject(DATABASE_PORT)
    private readonly databasePort: DatabasePort,
  ) {}

  private enumConvert(object: question): Question {
    if (isNull(object)) {
      return null;
    }

    return {
      ...object,
      responseType: object.responseType as EnumResponseType,
    };
  }

  async findManyByMissionId(missionId: number): Promise<Question[]> {
    const findQuestions = await this.databasePort.question.findMany({
      where: {
        missionId,
      },
      orderBy: {
        questionOrder: 'asc',
      },
    });

    return findQuestions.map((question) => this.enumConvert(question));
  }

  async countByMissionId(missionId: number): Promise<number> {
    const countQuestions = await this.databasePort.question.count({
      where: {
        missionId,
      },
    });
    return countQuestions;
  }
}
