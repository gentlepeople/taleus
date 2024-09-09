import { Injectable, Inject } from '@nestjs/common';

import { CoupleMission, Mission, Question } from '@/domain';
import { DATABASE_PORT, DatabasePort, ICoupleMissionRepository } from '@/ports';

@Injectable()
export class CoupleMissionRepository implements ICoupleMissionRepository {
  constructor(
    @Inject(DATABASE_PORT)
    private readonly databasePort: DatabasePort,
  ) {}

  async createMany(
    data: {
      coupleId: number;
      missionId: number;
    }[],
  ): Promise<number> {
    const { count: createCoupleMissionsCount } = await this.databasePort.coupleMission.createMany({
      data,
    });

    return createCoupleMissionsCount;
  }

  async countCompletedByCoupleId(coupleId: number): Promise<number> {
    const count = await this.databasePort.coupleMission.count({
      where: {
        coupleId,
        deletedAt: null,
        isCompleted: true,
      },
    });
    return count;
  }

  async getOngoingOneByUserId(userId: string): Promise<CoupleMission | null> {
    const getOngoingCoupleMission = await this.databasePort.coupleMission.findFirst({
      where: {
        couple: {
          OR: [
            {
              inviterId: userId,
            },
            {
              inviteeId: userId,
            },
          ],
        },
        deletedAt: null,
        isCompleted: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return getOngoingCoupleMission;
  }

  async findManyCompletedByUserIdSortByCreatedAtDesc(
    userId: string,
    pagination: { take: number; skip: number },
  ): Promise<(CoupleMission & { mission: Mission & { question: Question[] } })[]> {
    const findCompletedCoupleMissions = await this.databasePort.coupleMission.findMany({
      where: {
        couple: {
          OR: [
            {
              inviterId: userId,
            },
            {
              inviteeId: userId,
            },
          ],
        },
        deletedAt: null,
        isCompleted: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      ...pagination,
      include: {
        mission: {
          include: {
            question: {
              orderBy: {
                questionOrder: 'asc',
              },
            },
          },
        },
      },
    });
    return findCompletedCoupleMissions.map(
      ({ mission: { question, ...missionObject }, ...coupleMissionObject }) => ({
        mission: {
          question: question.map((object) => Question.enumConvert(object)),
          ...Mission.enumConvert(missionObject),
        },
        ...coupleMissionObject,
      }),
    );
  }
}
