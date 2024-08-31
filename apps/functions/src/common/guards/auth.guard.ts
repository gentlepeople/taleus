import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { logger } from 'firebase-functions/v2';

import { DEFAULT_LOCAL_USER_ID } from '../assets';

import { FirebaseAdminAuthAdapter } from '@/providers';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly firebaseAdminAuthAdapter: FirebaseAdminAuthAdapter;

  constructor(private reflector: Reflector) {
    this.firebaseAdminAuthAdapter = new FirebaseAdminAuthAdapter();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const idToken = this.extractTokenFromHeader(request);

    if (!idToken) {
      throw new UnauthorizedException('Token not found');
    }

    if (process.env.FUNCTIONS_EMULATOR) {
      request.user = { uid: DEFAULT_LOCAL_USER_ID };
      return true;
    }

    try {
      const { uid: decodedTokenUid } = await this.firebaseAdminAuthAdapter.verifyIdToken(idToken);
      request.user = { uid: decodedTokenUid };
      return true;
    } catch (error) {
      logger.error('Error', error);
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(request): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return undefined;
    }

    const [type, token] = authHeader.split(' ');

    return type === 'Bearer' ? token : undefined;
  }
}
