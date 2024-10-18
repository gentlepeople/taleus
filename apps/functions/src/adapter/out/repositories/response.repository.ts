import { Injectable, Inject } from '@nestjs/common';

import { EnumAnalyticsEventType } from '../providers';

import { Response } from '@/domain';
import {
  ANALYTICS_PORT,
  AnalyticsPort,
  DATABASE_PORT,
  DatabasePort,
  IResponseRepository,
  TIME_PORT,
  TimePort,
} from '@/ports';

@Injectable()
export class ResponseRepository implements IResponseRepository {
  constructor(
    @Inject(DATABASE_PORT)
    private readonly databasePort: DatabasePort,
    @Inject(ANALYTICS_PORT)
    private readonly analyticsPort: AnalyticsPort,
    @Inject(TIME_PORT)
    private readonly timePort: TimePort,
  ) {}

  async findManyByCoupleMissionIdAndUserId(
    coupleMissionId: bigint,
    userId: string,
  ): Promise<Response[]> {
    const findResponses = await this.databasePort.response.findMany({
      where: {
        coupleMissionId,
        userId,
      },
      orderBy: {
        question: {
          questionOrder: 'asc',
        },
      },
    });
    return findResponses;
  }

  async findManyByMissionIdAndUserIdExcludingCoupleMissions(
    missionId: bigint,
    userId: string,
  ): Promise<Response[]> {
    const findResponses = await this.databasePort.response.findMany({
      where: {
        question: {
          missionId,
        },
        userId,
        coupleMissionId: null,
      },
      orderBy: {
        question: {
          questionOrder: 'asc',
        },
      },
    });
    return findResponses;
  }

  async checkAllUsersCompletedCoupleMission(
    coupleMissionId: bigint,
    userIds: string[],
  ): Promise<boolean> {
    const {
      mission: { question },
    } = await this.databasePort.coupleMission.findUnique({
      where: {
        coupleMissionId,
      },
      select: {
        mission: {
          select: {
            question: true,
          },
        },
      },
    });
    const questionCount = question.length;
    const response = await this.databasePort.response.findMany({
      where: {
        coupleMissionId,
        userId: {
          in: userIds,
        },
      },
    });
    const responseCount = response.length;
    return questionCount > 0 && questionCount * userIds.length <= responseCount;
  }

  async findManyByCoupleMissionIdsAndUserIds(
    coupleMissionIds: bigint[],
    userIds: string[],
  ): Promise<Response[]> {
    const findResponses = await this.databasePort.response.findMany({
      where: {
        coupleMissionId: {
          in: coupleMissionIds,
        },
        userId: {
          in: userIds,
        },
      },
    });
    return findResponses;
  }

  async createMany(
    data: {
      userId: string;
      questionId: bigint;
      coupleMissionId?: bigint;
      content: string;
    }[],
  ): Promise<void> {
    await this.databasePort.response.createMany({
      data,
    });
    const findQuestions = await this.databasePort.question.findMany({
      where: {
        questionId: {
          in: data.map(({ questionId }) => questionId),
        },
      },
      select: {
        questionId: true,
        questionOrder: true,
        missionId: true,
        mission: {
          select: {
            category: true,
          },
        },
      },
    });
    const currentTime = this.timePort.get();
    const questionMap = new Map<
      bigint,
      { questionOrder: number; missionId: bigint; missionCategory: string }
    >();
    findQuestions.forEach(({ questionId, questionOrder, missionId, mission: { category } }) =>
      questionMap.set(questionId, {
        questionOrder,
        missionId,
        missionCategory: category,
      }),
    );
    //TODO: move to database trigger event
    data.forEach(({ userId, coupleMissionId, questionId }) => {
      const questionOrder = questionMap.get(questionId).questionOrder;
      const eventType =
        questionOrder === 1
          ? EnumAnalyticsEventType.submit_first_answer
          : questionOrder === 2
          ? EnumAnalyticsEventType.submit_second_answer
          : EnumAnalyticsEventType.submit_third_answer;
      this.analyticsPort.sendEvent({
        distinct_id: userId,
        type: eventType,
        properties: {
          couple_question_id: Number(coupleMissionId),
          question_id: Number(questionMap.get(questionId).missionId),
          question_subid: Number(questionId),
          question_category: questionMap.get(questionId).missionCategory,
          submit_date: currentTime,
        },
      });
      if (eventType === EnumAnalyticsEventType.submit_third_answer) {
        this.analyticsPort.incrementProfileProperty({
          distinctId: userId,
          propertyName: 'tale_count',
          incrementBy: 1,
        });
      }
    });
  }

  async updateContent(responseId: bigint, content: string): Promise<Response> {
    const updateResponse = await this.databasePort.response.update({
      where: {
        responseId,
      },
      data: {
        content,
      },
      include: {
        question: {
          select: {
            missionId: true,
            mission: {
              select: {
                category: true,
              },
            },
          },
        },
      },
    });
    //TODO: move to database trigger event
    const {
      userId,
      coupleMissionId,
      questionId,
      updatedAt,
      question: {
        missionId,
        mission: { category },
      },
    } = updateResponse;
    this.analyticsPort.sendEvent({
      distinct_id: userId,
      type: EnumAnalyticsEventType.update_answer,
      properties: {
        couple_question_id: Number(coupleMissionId),
        question_id: Number(missionId),
        question_subid: Number(questionId),
        question_category: category,
        submit_date: updatedAt,
      },
    });
    return updateResponse;
  }
}
