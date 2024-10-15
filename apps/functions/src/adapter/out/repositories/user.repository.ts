import {
  EnumGender,
  EnumOAuthProviderType,
  EnumSubscriptionStatus,
  user,
} from '@gentlepeople/taleus-schema';
import { Injectable, Inject } from '@nestjs/common';
import isNull from 'lodash/isNull';

import { DEFAULT_ANONYMOUS_USER_OBJECT } from '../../../common';

import { User } from '@/domain';
import { IUserRepository, DATABASE_PORT, DatabasePort, TIME_PORT, TimePort } from '@/ports';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @Inject(DATABASE_PORT)
    private readonly databasePort: DatabasePort,
    @Inject(TIME_PORT)
    private readonly timePort: TimePort,
  ) {}

  private enumConvert(object: user): User {
    if (isNull(object)) {
      return null;
    }

    return new User({
      ...object,
      gender: object.gender as EnumGender,
      oauthProviderType: object.oauthProviderType as EnumOAuthProviderType,
      notificationTime: object.notificationTime
        ? object.notificationTime.toTimeString().slice(0, 5)
        : null,
      subscriptionStatus: object.subscriptionStatus as EnumSubscriptionStatus,
    });
  }

  private enumConvertAndAnonymizeUser(object: user): User {
    if (isNull(object)) {
      return null;
    }

    const { deletedAt } = object;
    const isDeactivated = !isNull(deletedAt);
    if (isDeactivated) {
      return new User(DEFAULT_ANONYMOUS_USER_OBJECT);
    }

    return new User({
      ...object,
      gender: object.gender as EnumGender,
      oauthProviderType: object.oauthProviderType as EnumOAuthProviderType,
      notificationTime: object.notificationTime
        ? object.notificationTime.toTimeString().slice(0, 5)
        : null,
      subscriptionStatus: object.subscriptionStatus as EnumSubscriptionStatus,
    });
  }

  async findOneByUserId(userId: string): Promise<User | null> {
    const findUser = await this.databasePort.user.findUnique({
      where: {
        userId,
        deletedAt: null,
      },
    });

    return this.enumConvert(findUser);
  }

  async findOneByOAuthProviderId(oauthProviderId: string): Promise<User | null> {
    const findUser = await this.databasePort.user.findFirst({
      where: {
        oauthProviderId,
        deletedAt: null,
      },
    });

    return this.enumConvert(findUser);
  }

  async createOne(data: {
    userId: string;
    email: string;
    emailVerified: boolean;
    profileImageUrl: string;
    nickname: string;
    birthday: Date;
    gender: EnumGender;
    oauthProviderType: EnumOAuthProviderType;
    oauthProviderId: string;
    personalCode: string;
  }): Promise<{ userId: string }> {
    const { userId } = await this.databasePort.user.create({
      data: {
        ...data,
        birthday: this.timePort.get(data.birthday),
      },
    });
    return { userId };
  }

  async updateOne(
    userId: string,
    data: {
      nickname?: string;
      profileImageUrl?: string;
      birthday?: Date;
      gender?: EnumGender;
      coupleStartDate?: Date;
    },
  ): Promise<boolean> {
    await this.databasePort.user.update({
      where: {
        userId,
      },
      data,
    });
    return true;
  }

  async softDeleteOne(userId: string): Promise<boolean> {
    await this.databasePort.$transaction(async (tx) => {
      await tx.user.update({
        where: {
          userId,
        },
        data: {
          deletedAt: this.timePort.get(),
        },
      });
      await tx.couple.updateMany({
        where: {
          deletedAt: null,
          OR: [
            {
              inviteeId: userId,
              inviter: {
                deletedAt: {
                  not: null,
                },
              },
            },
            {
              inviterId: userId,
              invitee: {
                deletedAt: {
                  not: null,
                },
              },
            },
          ],
        },
        data: {
          deletedAt: new Date(),
        },
      });
    });
    return true;
  }

  async findPartnerByUserId(userId: string): Promise<User | null> {
    // find one even if the partner has withdrawn.
    const findCouple = await this.databasePort.couple.findFirst({
      where: {
        OR: [
          {
            inviteeId: userId,
          },
          { inviterId: userId },
        ],
      },
    });

    if (isNull(findCouple)) {
      return null;
    }

    const { inviteeId, inviterId } = findCouple;
    const partnerId = inviterId === userId ? inviteeId : inviterId;

    const findPartner = await this.databasePort.user.findUnique({
      where: {
        userId: partnerId,
      },
    });
    return this.enumConvertAndAnonymizeUser(findPartner);
  }

  async findOneByPersonalCode(personalCode: string): Promise<User | null> {
    const findUser = await this.databasePort.user.findFirst({
      where: { personalCode, deletedAt: null },
    });
    return this.enumConvert(findUser);
  }

  async updateCoupleStartDate(userId: string, coupleStartDate: Date): Promise<boolean> {
    await this.databasePort.user.update({
      where: {
        userId,
        deletedAt: null,
      },
      data: {
        coupleStartDate,
      },
    });
    return true;
  }

  async updateNotificationTime(userId: string, notificationTime: Date): Promise<boolean> {
    await this.databasePort.user.update({
      where: {
        userId,
        deletedAt: null,
      },
      data: {
        notificationTime,
      },
    });
    return true;
  }

  async updateNotificationTimeWithPartner(
    userId: string,
    partnerId: string,
    notificationTime: Date,
  ): Promise<boolean> {
    const { count } = await this.databasePort.user.updateMany({
      where: {
        userId: {
          in: [userId, partnerId],
        },
        deletedAt: null,
      },
      data: {
        notificationTime,
      },
    });
    return count === 2;
  }

  async updateSubscriptionStatus(
    userId: string,
    subscriptionStatus: EnumSubscriptionStatus,
  ): Promise<boolean> {
    try {
      await this.databasePort.user.update({
        where: {
          userId,
          deletedAt: null,
        },
        data: {
          subscriptionStatus,
        },
      });
      return true;
    } catch (e) {
      return false;
    }
  }
}
