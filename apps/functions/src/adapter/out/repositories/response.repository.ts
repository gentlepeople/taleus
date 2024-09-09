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
    coupleMissionId: number,
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

  async findManyByCoupleMissionIdsAndUserIds(
    coupleMissionIds: number[],
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
      questionId: number;
      coupleMissionId?: number;
      content: string;
    }[],
  ): Promise<void> {
    await this.databasePort.response.createMany({
      data,
    });
  }

  async countByCoupleMissionId(coupleMissionId: number): Promise<number> {
    const count = await this.databasePort.response.count({
      where: {
        coupleMissionId,
      },
    });
    return count;
  }
}
