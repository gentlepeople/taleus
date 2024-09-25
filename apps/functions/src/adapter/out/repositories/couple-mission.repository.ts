import { Injectable, Inject } from '@nestjs/common';

import { CoupleMission, Mission, Question } from '@/domain';
import {
  DATABASE_PORT,
  DatabasePort,
  ICoupleMissionRepository,
  TIME_PORT,
  TimePort,
} from '@/ports';

@Injectable()
export class CoupleMissionRepository implements ICoupleMissionRepository {
  constructor(
    @Inject(DATABASE_PORT)
    private readonly databasePort: DatabasePort,
    @Inject(TIME_PORT)
    private readonly timePort: TimePort,
  ) {}

  async findOneByCoupleMissionId(coupleMissionId: bigint): Promise<CoupleMission | null> {
    const findCoupleMission = await this.databasePort.coupleMission.findUnique({
      where: {
        coupleMissionId,
      },
    });
    return findCoupleMission;
  }

  async createMany(
    data: {
      coupleId: bigint;
      missionId: bigint;
    }[],
  ): Promise<number> {
    const { count: createCoupleMissionsCount } = await this.databasePort.coupleMission.createMany({
      data,
    });

    return createCoupleMissionsCount;
  }

  async countCompletedByCoupleId(coupleId: bigint): Promise<number> {
    const count = await this.databasePort.coupleMission.count({
      where: {
        coupleId,
        isCompleted: true,
      },
    });
    return count;
  }

  async findActiveOneByUserId(userId: string): Promise<CoupleMission | null> {
    const getActiveCoupleMission = await this.databasePort.coupleMission.findFirst({
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
          deletedAt: null,
        },

        isCompleted: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return getActiveCoupleMission;
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
          deletedAt: null,
        },
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

  async findManyCompletedByUserIdSortByHashKey(
    userId: string,
    pagination: { take: number; skip: number },
  ): Promise<(CoupleMission & { mission: Mission & { question: Question[] } })[]> {
    const todayFormat = this.timePort.dayjs().format('YYYY-MM-DD');

    const rawCoupleMissions = await this.databasePort.$queryRaw<
      {
        couple_mission_id: bigint;
        couple_id: bigint;
        mission_id: bigint;
        is_completed: boolean;
        reminder_count: number;
        cm_create_at: Date;
        m_title: string;
        m_category: string;
        m_created_at: Date;
        m_updated_at: Date;
        question: {
          question_id: bigint;
          mission_id: bigint;
          question_order: number;
          response_type: string;
          content: string;
          created_at: Date;
          updated_at: Date;
        }[];
      }[]
    >`
        SELECT  cm.couple_mission_id,
                cm.couple_id,
                cm.mission_id,
                cm.is_completed,
                cm.reminder_count,
                cm.created_at as cm_create_at,
                m.title as m_title,
                m.category as m_category,
                m.created_at as m_created_at,
                m.updated_at as m_updated_at,
                json_agg(
                  json_build_object(
                    'question_id', q.question_id,
                    'mission_id', q.mission_id,
                    'question_order', q.question_order,
                    'response_type', q.response_type,
                    'content', q.content,
                    'created_at', q.created_at,
                    'updated_at', q.updated_at
                  )
                ) AS question
        FROM couple_mission cm
        JOIN couple c ON cm.couple_id = c.couple_id
        JOIN mission m ON cm.mission_id = m.mission_id
        JOIN question q ON q.mission_id = m.mission_id
        WHERE (c.inviter_id = ${userId} OR c.invitee_id = ${userId})
          AND c.deleted_at IS NULL
          AND cm.is_completed = true
        GROUP BY 
          cm.couple_mission_id, cm.couple_id, cm.mission_id, 
          cm.is_completed, cm.reminder_count, cm.created_at, 
          m.title, m.category, m.created_at, m.updated_at
        ORDER BY hashtext(cm.mission_id || ${todayFormat})
        LIMIT ${pagination.take} OFFSET ${pagination.skip};
      `;

    return rawCoupleMissions.map((coupleMission) => {
      return {
        coupleMissionId: coupleMission.couple_mission_id,
        coupleId: coupleMission.couple_id,
        missionId: coupleMission.mission_id,
        isCompleted: coupleMission.is_completed,
        reminderCount: coupleMission.reminder_count,
        createdAt: coupleMission.cm_create_at,
        mission: {
          ...Mission.enumConvert({
            missionId: coupleMission.mission_id,
            title: coupleMission.m_title,
            category: coupleMission.m_category,
            createdAt: coupleMission.m_created_at,
            updatedAt: coupleMission.m_updated_at,
          }),
          question: coupleMission.question.map((q) =>
            Question.enumConvert({
              questionId: q.question_id,
              questionOrder: q.question_order,
              missionId: q.mission_id,
              responseType: q.response_type,
              content: q.content,
              createdAt: q.created_at,
              updatedAt: q.updated_at,
            }),
          ),
        },
      };
    });
  }

  async updateToCompleted(coupleMissionId: bigint): Promise<void> {
    await this.databasePort.coupleMission.update({
      where: {
        coupleMissionId,
      },
      data: {
        isCompleted: true,
      },
    });
  }
}
