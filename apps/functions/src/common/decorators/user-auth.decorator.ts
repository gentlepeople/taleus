import { applyDecorators, UseGuards } from '@nestjs/common';

import { UserAuthGuard } from '../guards';

export function UserAuth(...permissions: string[]) {
  return applyDecorators(
    // SetMetadata("permissions", permissions),
    UseGuards(UserAuthGuard),
  );
}
