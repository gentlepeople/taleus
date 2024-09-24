import { AuthenticationError } from '@nestjs/apollo';
import { Inject, Injectable } from '@nestjs/common';
import { TokenPayload, OAuth2Client } from 'google-auth-library';

import { sampleGoogleAccount } from './google-auth.const';

import { GOOGLE_AUTH_OPTIONS, GoogleAuthPort, IGoogleAuthOptionType } from '@/ports';

@Injectable()
export class GoogleAuthAdapter implements GoogleAuthPort {
  private auth: OAuth2Client;

  constructor(
    @Inject(GOOGLE_AUTH_OPTIONS)
    private readonly options: IGoogleAuthOptionType,
  ) {
    if (!this.options) {
      throw new TypeError("You must use 'forRootAsync' method to initialize GoogleAuthModule.");
    }

    const clientId = this.options.GOOGLE_AUTH_CLIENT_ID;
    const clientSecret = this.options.GOOGLE_AUTH_CLIENT_SECRET;
    this.auth = new OAuth2Client(clientId, clientSecret);
  }

  async getUserAccount(idToken: string): Promise<{
    uid: string;
    emailVerified?: boolean;
    email?: string;
    profileImageUrl?: string;
    nickname?: string;
  }> {
    try {
      if (idToken === process.env.GOOGLE_SAMPLE_ID_TOKEN) {
        return sampleGoogleAccount;
      }
      const loginTicket = await this.auth.verifyIdToken({
        idToken,
      });
      const uid: string | null = loginTicket.getUserId();
      const payload: TokenPayload | undefined = loginTicket.getPayload();
      return {
        uid,
        emailVerified: payload.email_verified,
        email: payload.email,
        nickname: payload.name,
        profileImageUrl: payload.picture,
      };
    } catch (e) {
      throw new AuthenticationError(`Error in GoogleAuthAdapter:getUserAccount: ${e}`);
    }
  }
}
