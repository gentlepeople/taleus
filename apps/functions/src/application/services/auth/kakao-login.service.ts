import { EnumGender, EnumOAuthProviderType } from '@gentlepeople/taleus-schema';
import { Inject, Injectable } from '@nestjs/common';
import isNull from 'lodash/isNull';

import { DEFAULT_PROFILE_IMAGE_URL, generateRandomCode } from '@/common';
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
      profileImageUrl: kakaoAccount?.profile.profile_image_url || DEFAULT_PROFILE_IMAGE_URL,
      email: kakaoAccount?.email || '',
      birthday: this.timePort.get(kakaoAccount?.birthday),
      gender: this.getEnumGenderFromString(kakaoAccount?.gender),
    };

    const userId = await this.findOrSaveUserWithProvider(
      oauthProviderId,
      EnumOAuthProviderType.KAKAO,
      userProperties,
    );

    const customToken = await this.authenticationPort.createCustomToken(userId);
    return { userId, customToken };
  }

  private async findOrSaveUserWithProvider(
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
      const { uid: authenticationUid } = await this.authenticationPort.createUser();

      const createUserId = await this.saveUser({
        ...oauthUserProperties,
        userId: authenticationUid,
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

  private async saveUser(userProperties: {
    userId: string;
    email: string;
    profileImageUrl: string;
    nickname: string;
    birthday: Date;
    gender: EnumGender;
    oauthProviderType: EnumOAuthProviderType;
    oauthProviderId: string;
  }): Promise<string> {
    const uniquePersonalCode = await this.generateUniqueUserPersonalCodeWithCheck();

    const { userId: createUserId } = await this.userRepository.createOne({
      ...userProperties,
      personalCode: uniquePersonalCode,
    });
    return createUserId;
  }

  private async generateUniqueUserPersonalCodeWithCheck(
    length: number = 8,
    maxAttempts: number = 10,
  ): Promise<string> {
    let code: string;
    let attempts = 0;

    while (attempts < maxAttempts) {
      code = generateRandomCode(length);

      if (await this.isUserPersonalCodeUnique(code)) {
        return code;
      }

      attempts++;
    }

    throw new Error(`Failed to generate a unique user personalCode after ${maxAttempts} attempts.`);
  }

  private async isUserPersonalCodeUnique(code: string): Promise<boolean> {
    const existingUser = await this.userRepository.findOneByPersonalCode(code);
    return !existingUser; // Return true if no user with the code exists
  }
}
