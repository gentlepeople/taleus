import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { EnumApiAuthType } from '../enums';

@Injectable()
export class ApiAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    const apiAuthType = this.reflector.get<EnumApiAuthType>('apiAuthType', context.getHandler());

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    switch (apiAuthType) {
      case EnumApiAuthType.SUBSCRIPTION: {
        if (token !== process.env.REVENUECAT_WEBHOOK_SECRET_TOKEN) {
          throw new UnauthorizedException('Invalid authorization token');
        }
        break;
      }
      case EnumApiAuthType.OTHER:
      default:
        throw new UnauthorizedException('Invalid authentication type');
    }

    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return undefined;
    }
    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
