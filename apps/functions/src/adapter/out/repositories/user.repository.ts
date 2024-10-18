import {
  EnumGender,
  EnumOAuthProviderType,
  EnumSubscriptionStatus,
  user,
} from '@gentlepeople/taleus-schema';
import { Injectable, Inject } from '@nestjs/common';
import isNull from 'lodash/isNull';

import { DEFAULT_ANONYMOUS_USER_OBJECT } from '../../../common';
import { EnumAnalyticsEventType } from '../providers';

import { User } from '@/domain';
import {
  IUserRepository,
  DATABASE_PORT,
  DatabasePort,
  TIME_PORT,
  TimePort,
  ANALYTICS_PORT,
  AnalyticsPort,
} from '@/ports';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @Inject(DATABASE_PORT)
    private readonly databasePort: DatabasePort,
    @Inject(TIME_PORT)
    private readonly timePort: TimePort,
    @Inject(ANALYTICS_PORT)
    private readonly analyticsPort: AnalyticsPort,
  ) {}

  private enumConvert(object: user): User {
    if (isNull(object)) {
      return null;
    }

    return new User({
      ...object,
      gender: object.gender as EnumGender,
      oauthProviderType: object.oauthProviderType as EnumOAuthProviderType,
      notificationTime: object.notificationTime,
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
      notificationTime: object.notificationTime,
      subscriptionStatus: object.subscriptionStatus as EnumSubscriptionStatus,
    });
  }

  private async findOneNotDeletedByUserIdQuery(userId: string): Promise<user | null> {
    return await this.databasePort.user.findUnique({
      where: {
        userId,
        deletedAt: null,
      },
    });
  }

  async findOneByUserId(userId: string): Promise<User | null> {
    const findUser = await this.findOneNotDeletedByUserIdQuery(userId);

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
    const createdUser = await this.databasePort.user.create({
      data: {
        ...data,
        birthday: this.timePort.get(data.birthday),
      },
      select: {
        userId: true,
        nickname: true,
        gender: true,
        birthday: true,
        coupleStartDate: true,
        createdAt: true,
        personalCode: true,
      },
    });
    //TODO: move to database trigger event
    this.trackSignupCompleteAnalytics(createdUser);
    const { userId } = createdUser;
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

  async updateNotificationTime(userId: string, notificationTime: string): Promise<boolean> {
    const findUser = await this.findOneNotDeletedByUserIdQuery(userId);
    const isFirstTimeSetup = isNull(findUser.notificationTime);

    const { notificationTime: updatedNotificationTime } = await this.databasePort.user.update({
      where: {
        userId,
        deletedAt: null,
      },
      data: {
        notificationTime,
      },
    });

    //TODO: move to database trigger event
    const eventType = isFirstTimeSetup
      ? EnumAnalyticsEventType.setup_couple_notification_time
      : EnumAnalyticsEventType.update_couple_notification_time;
    this.analyticsPort.sendEvent({
      distinct_id: userId,
      type: eventType,
      properties: {
        notification_time: updatedNotificationTime,
      },
    });
    this.analyticsPort.setProfileProperties({
      distinctId: userId,
      properties: {
        notification_time: updatedNotificationTime,
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

  private trackSignupCompleteAnalytics(user: {
    userId: string;
    nickname: string;
    gender: string;
    birthday: Date;
    coupleStartDate: Date;
    createdAt: Date;
    personalCode: string;
  }): void {
    const { userId, nickname, gender, birthday, coupleStartDate, createdAt, personalCode } = user;

    const signupCompleteEventProperties = {
      user_id: userId,
      nickname: nickname,
      gender: gender,
      birthday: this.timePort.dayjs(birthday).format('YYYY-MM-DD'),
      anniversary: this.timePort.dayjs(coupleStartDate).format('YYYY-MM-DD'),
      signup_date: createdAt,
      couple_code: personalCode,
    };

    this.analyticsPort.setProfileProperties({
      distinctId: userId,
      properties: {
        connect_status: false,
        subscription_status: EnumSubscriptionStatus.UNSUBSCRIBED,
        tale_count: 0,
        ...signupCompleteEventProperties,
      },
    });

    this.analyticsPort.sendEvent({
      type: EnumAnalyticsEventType.signup_complete,
      distinct_id: userId,
      properties: signupCompleteEventProperties,
    });
  }
}
