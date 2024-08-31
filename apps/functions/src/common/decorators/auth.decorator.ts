import { applyDecorators, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../guards';

export function Auth(...permissions: string[]) {
  return applyDecorators(
    // SetMetadata("permissions", permissions),
    UseGuards(AuthGuard),
  );
}
