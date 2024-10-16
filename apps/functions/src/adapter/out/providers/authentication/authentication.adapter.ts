import { Injectable } from '@nestjs/common';
import { auth } from 'firebase-admin';

import { isLocal } from '@/common';
import { AuthenticationPort } from '@/ports';

@Injectable()
export class AuthenticationAdapter implements AuthenticationPort {
  private auth: auth.Auth;

  constructor() {
    if (isLocal) {
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

  async verifyIdToken(idToken: string): Promise<{ uid: string }> {
    const { uid } = await this.auth.verifyIdToken(idToken);
    return { uid };
  }

  async deleteUser(uid: string): Promise<boolean> {
    await this.auth.deleteUser(uid);
    return true;
  }
}
