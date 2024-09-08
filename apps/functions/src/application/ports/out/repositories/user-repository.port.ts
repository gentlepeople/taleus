import { EnumGender, EnumOAuthProviderType } from '@gentlepeople/taleus-schema';

import { User } from '@/domain';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface IUserRepository {
  createOne(data: {
    userId: string;
    nickname: string;
    email: string;
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
      birthday?: Date;
      gender?: EnumGender;
    },
  ): Promise<boolean>;
  updateNotificationTime(userId: string, notificationTime: Date): Promise<void>;
  updateNotificationTimeWithPartner(
    userId: string,
    partnerId: string,
    notificationTime: Date,
  ): Promise<void>;
  softDeleteOne(userId: string): Promise<boolean>;
}
