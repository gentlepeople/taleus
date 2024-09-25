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

  private enumConvertAndAnonymizeUser(object: user): User {
    if (isNull(object)) {
      return null;
    }

    const { deletedAt } = object;
    const isDeactivated = !isNull(deletedAt);
    if (isDeactivated) {
      return DEFAULT_ANONYMOUS_USER_OBJECT;
    }

    return {
      ...object,
      isAnonymous: !isDeactivated,
      gender: object.gender as EnumGender,
      oauthProviderType: object.oauthProviderType as EnumOAuthProviderType,
      notificationTime: object.notificationTime
        ? object.notificationTime.toTimeString().slice(0, 5)
        : null,
      subscriptionStatus: object.subscriptionStatus as EnumSubscriptionStatus,
    };
  }

  async findOneByUserId(userId: string): Promise<User | null> {
    const findUser = await this.databasePort.user.findUnique({
      where: {
        userId,
      },
    });

    return this.enumConvertAndAnonymizeUser(findUser);
  }

  async findOneByOAuthProviderId(oauthProviderId: string): Promise<User | null> {
    const findUser = await this.databasePort.user.findFirst({
      where: {
        oauthProviderId,
        deletedAt: null,
      },
    });

    return this.enumConvertAndAnonymizeUser(findUser);
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
    await this.databasePort.user.update({
      where: {
        userId,
      },
      data: {
        deletedAt: this.timePort.get(),
      },
    });
    return true;
  }

  async findPartnerByUserId(userId: string): Promise<User | null> {
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

    const isCouple = !isNull(findCouple);

    if (!isCouple) {
      return null;
    }

    const { inviteeId, inviterId } = findCouple;
    const partnerId = inviterId === userId ? inviteeId : inviterId;

    const findPartner = await this.findOneByUserId(partnerId);
    return findPartner;
  }

  async findOneByPersonalCode(personalCode: string): Promise<User | null> {
    const findUser = await this.databasePort.user.findUnique({
      where: { personalCode },
    });
    return this.enumConvertAndAnonymizeUser(findUser);
  }

  async updateCoupleStartDate(userId: string, coupleStartDate: Date): Promise<boolean> {
    await this.databasePort.user.update({
      where: {
        userId,
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
    await this.databasePort.user.updateMany({
      where: {
        userId: {
          in: [userId, partnerId],
        },
      },
      data: {
        notificationTime,
      },
    });
    return true;
  }

  async updateSubscriptionStatus(
    userId: string,
    subscriptionStatus: EnumSubscriptionStatus,
  ): Promise<boolean> {
    try {
      await this.databasePort.user.update({
        where: {
          userId,
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
