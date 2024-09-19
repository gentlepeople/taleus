import { EnumGender, EnumOAuthProviderType } from '@gentlepeople/taleus-schema';
import { Inject, Injectable } from '@nestjs/common';

import { findOrSaveUserWithProvider } from './auth-service.method';

import { DEFAULT_PROFILE_IMAGE_URL } from '@/common';
import {
  AUTHENTICATION_PORT,
  AuthenticationPort,
  IUserRepository,
  APPLE_AUTH_PORT,
  AppleAuthPort,
  AppleLoginUsecase,
  TIME_PORT,
  TimePort,
  USER_REPOSITORY,
} from '@/ports';

@Injectable()
export class AppleLoginService implements AppleLoginUsecase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(AUTHENTICATION_PORT)
    private readonly authenticationPort: AuthenticationPort,
    @Inject(APPLE_AUTH_PORT)
    private readonly appleAuthPort: AppleAuthPort,
    @Inject(TIME_PORT)
    private readonly timePort: TimePort,
  ) {}

  async execute(accessToken: string): Promise<{ userId: string; customToken: string }> {
    const { uid: appleAccountId, ...appleAccount } = await this.appleAuthPort.getUserAccount(
      accessToken,
    );
    const oauthProviderId = `apple:${appleAccountId}`;

    const userProperties = {
      nickname: '',
      profileImageUrl: DEFAULT_PROFILE_IMAGE_URL,
      email: appleAccount.email || '',
      emailVerified: appleAccount.emailVerified || false,
      birthday: this.timePort.get(),
      gender: EnumGender.UNKNOWN,
    };

    const userId = await findOrSaveUserWithProvider(this.userRepository, this.authenticationPort, {
      oauthProviderId,
      oauthProviderType: EnumOAuthProviderType.APPLE,
      oauthUserProperties: userProperties,
    });

    const customToken = await this.authenticationPort.createCustomToken(userId);
    return { userId, customToken };
  }
}
