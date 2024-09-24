import { Module } from '@nestjs/common';

import { AuthenticationAdapter } from './authentication.adapter';

import { AUTHENTICATION_PORT } from '@/ports';

@Module({
  providers: [
    {
      provide: AUTHENTICATION_PORT,
      useClass: AuthenticationAdapter,
    },
  ],
  exports: [AUTHENTICATION_PORT],
})
export class AuthenticationModule {}
