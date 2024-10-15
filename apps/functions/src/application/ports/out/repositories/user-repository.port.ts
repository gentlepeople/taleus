import {
  EnumGender,
  EnumOAuthProviderType,
  EnumSubscriptionStatus,
} from '@gentlepeople/taleus-schema';

import { User } from '@/domain';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface IUserRepository {
  createOne(data: {
    userId: string;
    nickname: string;
    email: string;
    emailVerified: boolean;
    profileImageUrl: string;
    birthday: Date;
    gender: EnumGender;
    oauthProviderType: EnumOAuthProviderType;
    oauthProviderId: string;
    personalCode: string;
  }): Promise<{ userId: string }>;
  findOneByUserId(userId: string): Promise<User | null>;
  findOneByOAuthProviderId(oauthProviderId: string): Promise<User | null>;
  findPartnerByUserId(userId: string): Promise<User | null>;
  findOneByPersonalCode(personalCode: string): Promise<User | null>;
  updateOne(
    userId: string,
    data: {
      nickname?: string;
      profileImageUrl?: string;
      gender?: EnumGender;
      birthday?: Date;
      coupleStartDate?: Date;
    },
  ): Promise<boolean>;
  updateCoupleStartDate(userId: string, coupleStartDate: Date): Promise<boolean>;
  updateNotificationTime(userId: string, notificationTime: string): Promise<boolean>;
  updateNotificationTimeWithPartner(
    userId: string,
    partnerId: string,
    notificationTime: string,
  ): Promise<boolean>;
  softDeleteOne(userId: string): Promise<boolean>;
  updateSubscriptionStatus(
    userId: string,
    subscriptionStatus: EnumSubscriptionStatus,
  ): Promise<boolean>;
}
