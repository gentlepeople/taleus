import { couple } from '@gentlepeople/taleus-schema';
import { Injectable, Inject } from '@nestjs/common';
import isNull from 'lodash/isNull';

import { DEFAULT_ANONYMOUS_USER_OBJECT } from '../../../common';

import { Couple } from '@/domain';
import { DATABASE_PORT, DatabasePort, ICoupleRepository } from '@/ports';

@Injectable()
export class CoupleRepository implements ICoupleRepository {
  constructor(
    @Inject(DATABASE_PORT)
    private readonly databasePort: DatabasePort,
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

  async createOne(inviterId: string, inviteeId: string): Promise<Couple | null> {
    const createCouple = await this.databasePort.couple.create({
      data: {
        inviterId,
        inviteeId,
      },
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

  async findOneByCoupleId(coupleId: number): Promise<Couple | null> {
    const findCouple = await this.databasePort.couple.findUnique({
      where: {
        coupleId,
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
}
