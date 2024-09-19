import { Module } from '@nestjs/common';

import { AppleAuthAdapter } from './apple-auth.adapter';

import { APPLE_AUTH_PORT } from '@/ports';

@Module({
  providers: [
    {
      provide: APPLE_AUTH_PORT,
      useClass: AppleAuthAdapter,
    },
  ],
  exports: [APPLE_AUTH_PORT],
})
export class AppleAuthModule {}
