import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { logger } from 'firebase-functions/v2';

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
      return true;
    }

    try {
      await this.firebaseAdminAuthAdapter.verifyIdToken(idToken);
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
