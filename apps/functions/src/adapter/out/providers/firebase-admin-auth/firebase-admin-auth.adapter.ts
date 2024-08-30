import { Injectable } from '@nestjs/common';
import { auth } from 'firebase-admin';

import { AuthenticationPort } from '@/ports';

export type IFirebaseAdminAuthenticationInjectType = {};

@Injectable()
export class FirebaseAdminAuthAdapter implements AuthenticationPort {
  private auth: auth.Auth;

  constructor() {
    if (Boolean(process.env.FUNCTIONS_EMULATOR)) {
      process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099';
    }
    this.auth = auth();
  }

  async createUser(): Promise<{
    uid: string;
  }> {
    const { uid } = await this.auth.createUser({});

    return { uid };
  }

  async createCustomToken(uid: string): Promise<string> {
    return await this.auth.createCustomToken(uid);
  }
}
