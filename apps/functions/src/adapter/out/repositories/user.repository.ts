import { EnumGender, EnumOAuthProviderType, users } from '@gentlepeople/taleus-schema';
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

  private enumConvertAndAnonymizeUser(object: users): User {
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
    };
  }

  async findOneByUserId(userId: string): Promise<User | null> {
    const findUser = await this.databasePort.users.findUnique({
      where: {
        userId,
      },
    });

    return this.enumConvertAndAnonymizeUser(findUser);
  }

  async findOneByOAuthProviderId(oauthProviderId: string): Promise<User | null> {
    const findUser = await this.databasePort.users.findFirst({
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
    profileImageUrl: string;
    nickname: string;
    birthday: Date;
    gender: EnumGender;
    oauthProviderType: EnumOAuthProviderType;
    oauthProviderId: string;
    personalCode: string;
  }): Promise<{ userId: string }> {
    const { userId } = await this.databasePort.users.create({
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
    },
  ): Promise<boolean> {
    await this.databasePort.users.update({
      where: {
        userId,
      },
      data,
    });
    return true;
  }

  async softDeleteOne(userId: string): Promise<boolean> {
    await this.databasePort.users.update({
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
    const findUser = await this.databasePort.users.findUnique({
      where: { personalCode },
    });
    return this.enumConvertAndAnonymizeUser(findUser);
  }
}
