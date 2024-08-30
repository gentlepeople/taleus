import { EnumGender, EnumOAuthProviderType } from '@gentlepeople/taleus-schema';
import { Inject, Injectable } from '@nestjs/common';
import isNull from 'lodash/isNull';

import {
  AUTHENTICATION_PORT,
  AuthenticationPort,
  IUserRepository,
  KAKAO_AUTH_PORT,
  KakaoAuthPort,
  KakaoLoginUsecase,
  TIME_PORT,
  TimePort,
  USER_REPOSITORY,
} from '@/ports';

@Injectable()
export class KakaoLoginService implements KakaoLoginUsecase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(AUTHENTICATION_PORT)
    private readonly authenticationPort: AuthenticationPort,
    @Inject(KAKAO_AUTH_PORT)
    private readonly kakaoAuthPort: KakaoAuthPort,
    @Inject(TIME_PORT)
    private readonly timePort: TimePort,
  ) {}

  async execute(accessToken: string): Promise<{ userId: string; customToken: string }> {
    const { id: kakaoAccountId, kakao_account: kakaoAccount } =
      await this.kakaoAuthPort.getUserAccount(accessToken);
    const oauthProviderId = `kakao:${kakaoAccountId}`;

    const userProperties = {
      nickname: kakaoAccount?.profile?.nickname || '',
      profileImageUrl:
        kakaoAccount?.profile.profile_image_url ||
        'https://img1.kakaocdn.net/thumb/R640x640.q70/?fname=https://t1.kakaocdn.net/account_images/default_profile.jpeg',
      email: kakaoAccount?.email || '',
      birthday: this.timePort.get(kakaoAccount?.birthday),
      gender: this.getEnumGenderFromString(kakaoAccount?.gender),
    };

    const userId = await this.findOrCreateUserWithProvider(
      oauthProviderId,
      EnumOAuthProviderType.KAKAO,
      userProperties,
    );

    const customToken = await this.authenticationPort.createCustomToken(userId);
    return { userId, customToken };
  }

  private async findOrCreateUserWithProvider(
    oauthProviderId: string,
    oauthProviderType: EnumOAuthProviderType,
    oauthUserProperties: {
      nickname: string;
      email: string;
      profileImageUrl: string;
      birthday: Date;
      gender: EnumGender;
    },
  ): Promise<string> {
    const findUser = await this.userRepository.findOneByOAuthProviderId(oauthProviderId);

    const userNotFound = isNull(findUser);
    if (userNotFound) {
      const createUserId = await this.createAuthenticatedUser({
        ...oauthUserProperties,
        oauthProviderId,
        oauthProviderType,
      });
      return createUserId;
    }
    const { userId: findUserId } = findUser;
    return findUserId;
  }

  private getEnumGenderFromString(genderString: string): EnumGender {
    switch (genderString.toUpperCase()) {
      case EnumGender.MALE:
        return EnumGender.MALE;
      case EnumGender.FEMALE:
        return EnumGender.FEMALE;
      default:
        return EnumGender.UNKNOWN;
    }
  }

  private async createAuthenticatedUser(userProperties: {
    email: string;
    profileImageUrl: string;
    nickname: string;
    birthday: Date;
    gender: EnumGender;
    oauthProviderType: EnumOAuthProviderType;
    oauthProviderId: string;
  }): Promise<string> {
    const { uid: authenticationUid } = await this.authenticationPort.createUser();

    const { userId: createUserId } = await this.userRepository.createOne({
      ...userProperties,
      userId: authenticationUid,
    });
    return createUserId;
  }
}
