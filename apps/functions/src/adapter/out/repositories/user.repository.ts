import { EnumGender, EnumOAuthProviderType, users } from '@gentlepeople/taleus-schema';
import { Injectable, Inject } from '@nestjs/common';
import isNull from 'lodash/isNull';

import { User } from '@/domain';
import { IUserRepository, DATABASE_PORT, DatabasePort } from '@/ports';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @Inject(DATABASE_PORT)
    private readonly databasePort: DatabasePort,
  ) {}

  private enumConvert(object: users): User {
    return {
      ...object,
      gender: object.gender as EnumGender,
      oauthProviderType: object.oauthProviderType as EnumOAuthProviderType,
    };
  }

  async findOneByUserId(userId: string): Promise<User | null> {
    const findUser = await this.databasePort.users.findUnique({
      where: {
        userId,
        deletedAt: null,
      },
    });

    return isNull(findUser) ? null : this.enumConvert(findUser);
  }

  async findOneByOAuthProviderId(oauthProviderId: string): Promise<User | null> {
    const findUser = await this.databasePort.users.findFirst({
      where: {
        oauthProviderId,
        deletedAt: null,
      },
    });

    return isNull(findUser) ? null : this.enumConvert(findUser);
  }

  async createOne(data: {
    userId: string;
    email: string;
    profileImageUrl: string;
    nickname: string;
    birthday: Date;
    gender: EnumGender;
    oauthProviderType: EnumOAuthProviderType;
    oauthProviderId: string;
  }): Promise<{ userId: string }> {
    const { userId } = await this.databasePort.users.create({
      data,
    });
    return { userId };
  }
}
