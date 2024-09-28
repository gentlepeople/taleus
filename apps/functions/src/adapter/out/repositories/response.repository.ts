import { Injectable, Inject } from '@nestjs/common';

import { Response } from '@/domain';
import { DATABASE_PORT, DatabasePort, IResponseRepository } from '@/ports';

@Injectable()
export class ResponseRepository implements IResponseRepository {
  constructor(
    @Inject(DATABASE_PORT)
    private readonly databasePort: DatabasePort,
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
  }

  async updateContent(responseId: bigint, content: string): Promise<Response> {
    const updateResponse = await this.databasePort.response.update({
      where: {
        responseId,
      },
      data: {
        content,
      },
    });
    return updateResponse;
  }
}
