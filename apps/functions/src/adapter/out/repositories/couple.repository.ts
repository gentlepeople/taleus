import { couple } from '@gentlepeople/taleus-schema';
import { UserInputError } from '@nestjs/apollo';
import { Injectable, Inject } from '@nestjs/common';
import isNull from 'lodash/isNull';

import { DEFAULT_ANONYMOUS_USER_OBJECT, ONBOARDING_MISSION_ID } from '../../../common';
import { EnumAnalyticsEventType } from '../providers';

import { Couple } from '@/domain';
import {
  ANALYTICS_PORT,
  AnalyticsPort,
  DATABASE_PORT,
  DatabasePort,
  ICoupleRepository,
} from '@/ports';

@Injectable()
export class CoupleRepository implements ICoupleRepository {
  constructor(
    @Inject(DATABASE_PORT)
    private readonly databasePort: DatabasePort,
    @Inject(ANALYTICS_PORT)
    private readonly analyticsPort: AnalyticsPort,
  ) {}

  private convertAnonymizeUser(
    object: couple & {
      invitee: {
        deletedAt: Date;
      };
      inviter: {
        deletedAt: Date;
      };
    },
  ): Couple {
    if (isNull(object)) {
      return null;
    }

    const {
      inviter: { deletedAt: inviterDeletedAt },
      invitee: { deletedAt: inviteeDeletedAt },
    } = object;

    return {
      ...object,
      ...(!isNull(inviterDeletedAt) && {
        inviterId: DEFAULT_ANONYMOUS_USER_OBJECT.userId,
      }),
      ...(!isNull(inviteeDeletedAt) && {
        inviteeId: DEFAULT_ANONYMOUS_USER_OBJECT.userId,
      }),
    };
  }

  async createOneWithAssigningOnboardingMission(
    inviterId: string,
    inviteeId: string,
  ): Promise<Couple | null> {
    const usersCount = await this.databasePort.user.count({
      where: {
        userId: {
          in: [inviteeId, inviterId],
        },
        deletedAt: null,
      },
    });
    const hasDeletedUser = usersCount < 2;
    if (hasDeletedUser) {
      throw new UserInputError('No valid userId provided.');
    }

    const createCouple = await this.databasePort.$transaction(async (tx) => {
      const { coupleStartDate: inviterCoupleStartDate } = await tx.user.findUnique({
        where: {
          userId: inviterId,
        },
      });
      const createCouple = await tx.couple.create({
        data: {
          inviterId,
          inviteeId,
          startDate: inviterCoupleStartDate,
        },
      });
      const { coupleId } = createCouple;
      const onboardingQuestions = await tx.question.findMany({
        where: {
          missionId: ONBOARDING_MISSION_ID,
        },
      });

      const questionIds = onboardingQuestions.map(({ questionId }) => questionId);

      const missionResponses = await tx.response.findMany({
        where: {
          userId: {
            in: [inviterId, inviteeId],
          },
          questionId: {
            in: questionIds,
          },
          coupleMissionId: null,
        },
      });

      const allUsersHaveRespondedToAllQuestions = questionIds.every((questionId) => {
        const inviterHasResponse = missionResponses.some(
          (response) => response.userId === inviterId && response.questionId === questionId,
        );
        const inviteeHasResponse = missionResponses.some(
          (response) => response.userId === inviteeId && response.questionId === questionId,
        );
        return inviterHasResponse && inviteeHasResponse;
      });

      const isCoupleMissionCompleted =
        onboardingQuestions.length > 0 && allUsersHaveRespondedToAllQuestions;

      const { coupleMissionId: createCoupleMissionId } = await tx.coupleMission.create({
        data: {
          coupleId,
          missionId: ONBOARDING_MISSION_ID,
          isCompleted: isCoupleMissionCompleted,
        },
      });

      await tx.response.updateMany({
        where: {
          responseId: {
            in: missionResponses.map(({ responseId }) => responseId),
          },
        },
        data: {
          coupleMissionId: createCoupleMissionId,
        },
      });
      //TODO: move to database trigger event
      [inviteeId, inviterId].forEach((userId) => {
        this.analyticsPort.sendEvent({
          type: EnumAnalyticsEventType.connect_couple_complete,
          distinct_id: userId,
          properties: {
            connect_status: true,
          },
        });
        this.analyticsPort.setProfileProperties({
          distinctId: userId,
          properties: {
            connect_status: true,
          },
        });
      });

      return createCouple;
    });
    return createCouple;
  }

  async findOneByUserId(userId: string): Promise<Couple | null> {
    const findCouple = await this.databasePort.couple.findFirst({
      where: {
        OR: [
          {
            inviteeId: userId,
          },
          { inviterId: userId },
        ],
        deletedAt: null,
      },
      include: {
        invitee: {
          select: {
            deletedAt: true,
          },
        },
        inviter: {
          select: {
            deletedAt: true,
          },
        },
      },
    });

    return this.convertAnonymizeUser(findCouple);
  }

  async findOneByCoupleId(coupleId: bigint): Promise<Couple | null> {
    const findCouple = await this.databasePort.couple.findUnique({
      where: {
        coupleId,
        deletedAt: null,
      },
      include: {
        invitee: {
          select: {
            deletedAt: true,
          },
        },
        inviter: {
          select: {
            deletedAt: true,
          },
        },
      },
    });
    return this.convertAnonymizeUser(findCouple);
  }

  async updateOne(
    coupleId: bigint,
    data: {
      startDate: Date;
    },
  ): Promise<boolean> {
    await this.databasePort.couple.update({
      where: {
        coupleId,
      },
      data,
    });
    return true;
  }

  async findManyRequiredMissionByNotificationTimeWithLatestCompletedMission(
    hour: number,
    minute: number,
  ): Promise<
    (Couple & {
      latestCoupleMission: {
        missionId: bigint;
      };
    })[]
  > {
    const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

    const findCouples = await this.databasePort.couple.findMany({
      where: {
        deletedAt: null,
        inviter: {
          notificationTime: timeString,
          deletedAt: null,
        },
        invitee: {
          deletedAt: null,
        },
        coupleMission: {
          none: {
            isCompleted: false,
          },
        },
      },
      include: {
        coupleMission: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
          select: {
            missionId: true,
          },
        },
      },
    });

    return findCouples.map(({ coupleMission, ...data }) => ({
      latestCoupleMission: coupleMission.length > 0 ? coupleMission[0] : null,
      ...data,
    }));
  }
}
