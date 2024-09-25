import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

import { EnumApiAuthType } from '../enums';
import { ApiAuthGuard } from '../guards';

export function ApiAuth(apiAuthType: EnumApiAuthType) {
  return applyDecorators(SetMetadata('apiAuthType', apiAuthType), UseGuards(ApiAuthGuard));
}
