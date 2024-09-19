import { AuthenticationError } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { verifyIdToken } from 'apple-signin-auth';

import { sampleAppleAccount } from './apple-auth.const';

import { AppleAuthPort } from '@/ports';

@Injectable()
export class AppleAuthAdapter implements AppleAuthPort {
  private clientId: string;

  constructor() {
    this.clientId = process.env.APPLE_AUTH_CLIENT_ID;
  }

  async getUserAccount(
    idToken: string,
    options?: { nonce: string },
  ): Promise<{
    uid: string;
    emailVerified: boolean;
    email: string;
  }> {
    try {
      if (idToken === process.env.APPLE_SAMPLE_ID_TOKEN) {
        return sampleAppleAccount;
      }
      const tokenResponse = await verifyIdToken(idToken, {
        audience: this.clientId,
        nonce: options?.nonce || undefined,
      });

      if (!tokenResponse) {
        throw new AuthenticationError('Invalid ID token');
      }
      const { sub, email, email_verified } = tokenResponse;
      return {
        uid: sub,
        emailVerified: email_verified === true || email_verified === 'true',
        email,
      };
    } catch (e) {
      throw new AuthenticationError(`Error in AppleAuthAdapter:getUserAccount: ${e}`);
    }
  }
}
