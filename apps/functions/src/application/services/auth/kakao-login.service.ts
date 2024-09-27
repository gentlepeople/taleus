import { EnumGender, EnumOAuthProviderType } from '@gentlepeople/taleus-schema';
import { Inject, Injectable } from '@nestjs/common';
import isNil from 'lodash/isNil';

import { findOrSaveUserWithProvider } from './auth-service.method';

import { DEFAULT_PROFILE_IMAGE_URL } from '@/common';
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
      profileImageUrl: kakaoAccount?.profile?.profile_image_url || DEFAULT_PROFILE_IMAGE_URL,
      email: kakaoAccount?.email || '',
      emailVerified: kakaoAccount?.is_email_verified || false,
      birthday: this.timePort.get(kakaoAccount?.birthday),
      gender: this.getEnumGenderFromString(kakaoAccount?.gender),
    };

    const userId = await findOrSaveUserWithProvider(this.userRepository, this.authenticationPort, {
      oauthProviderId,
      oauthProviderType: EnumOAuthProviderType.KAKAO,
      oauthUserProperties: userProperties,
    });

    const customToken = await this.authenticationPort.createCustomToken(userId);
    return { userId, customToken };
  }

  private getEnumGenderFromString(genderString?: string): EnumGender {
    const checkExist = !isNil(genderString);
    if (checkExist) {
      switch (genderString.toUpperCase()) {
        case EnumGender.MALE:
          return EnumGender.MALE;
        case EnumGender.FEMALE:
          return EnumGender.FEMALE;
      }
    }
    return EnumGender.UNKNOWN;
  }
}
