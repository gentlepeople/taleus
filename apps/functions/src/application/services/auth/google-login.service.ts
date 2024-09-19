import { EnumGender, EnumOAuthProviderType } from '@gentlepeople/taleus-schema';
import { Inject, Injectable } from '@nestjs/common';

import { findOrSaveUserWithProvider } from './auth-service.method';

import { DEFAULT_PROFILE_IMAGE_URL } from '@/common';
import {
  AUTHENTICATION_PORT,
  AuthenticationPort,
  IUserRepository,
  GOOGLE_AUTH_PORT,
  GoogleAuthPort,
  GoogleLoginUsecase,
  TIME_PORT,
  TimePort,
  USER_REPOSITORY,
} from '@/ports';

@Injectable()
export class GoogleLoginService implements GoogleLoginUsecase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(AUTHENTICATION_PORT)
    private readonly authenticationPort: AuthenticationPort,
    @Inject(GOOGLE_AUTH_PORT)
    private readonly googleAuthPort: GoogleAuthPort,
    @Inject(TIME_PORT)
    private readonly timePort: TimePort,
  ) {}

  async execute(accessToken: string): Promise<{ userId: string; customToken: string }> {
    const { uid: googleAccountId, ...googleAccount } = await this.googleAuthPort.getUserAccount(
      accessToken,
    );
    const oauthProviderId = `google:${googleAccountId}`;

    const userProperties = {
      nickname: googleAccount.nickname || '',
      profileImageUrl: googleAccount.profileImageUrl || DEFAULT_PROFILE_IMAGE_URL,
      email: googleAccount.email || '',
      emailVerified: googleAccount.emailVerified || false,
      birthday: this.timePort.get(),
      gender: EnumGender.UNKNOWN,
    };

    const userId = await findOrSaveUserWithProvider(this.userRepository, this.authenticationPort, {
      oauthProviderId,
      oauthProviderType: EnumOAuthProviderType.GOOGLE,
      oauthUserProperties: userProperties,
    });

    const customToken = await this.authenticationPort.createCustomToken(userId);
    return { userId, customToken };
  }
}
