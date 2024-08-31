import { EnumGender, EnumOAuthProviderType } from '@gentlepeople/taleus-schema';

import { User } from '@/domain';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface IUserRepository {
  findOneByUserId(userId: string): Promise<User | null>;
  createOne(data: {
    userId: string;
    nickname: string;
    email: string;
    profileImageUrl: string;
    birthday: Date;
    gender: EnumGender;
    oauthProviderType: EnumOAuthProviderType;
    oauthProviderId: string;
  }): Promise<{ userId: string }>;
  findOneByOAuthProviderId(oauthProviderId: string): Promise<User | null>;
  updateOne(
    userId: string,
    data: {
      nickname?: string;
      profileImageUrl?: string;
      birthday?: Date;
      gender?: EnumGender;
    },
  ): Promise<void>;
}
