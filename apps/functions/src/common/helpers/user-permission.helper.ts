import { UnauthorizedException } from '@nestjs/common';

import { DEFAULT_LOCAL_USER_ID } from '../assets';
import { GqlContext } from '../interfaces';

export function checkUserPermission(context: GqlContext, userId: string) {
  if (!context.req.user) {
    throw new UnauthorizedException('User not authenticated. Please log in to access this data.');
  }

  const authenticatedUserId = context.req.user.uid;

  if (process.env.NODE_ENV === 'local' && authenticatedUserId === DEFAULT_LOCAL_USER_ID) {
    return;
  }

  if (userId !== authenticatedUserId) {
    throw new UnauthorizedException(
      "You are not authorized to access this user's data. Access denied.",
    );
  }
}
