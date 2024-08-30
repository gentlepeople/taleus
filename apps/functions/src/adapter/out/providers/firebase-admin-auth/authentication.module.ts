import { Module } from '@nestjs/common';

import { FirebaseAdminAuthAdapter } from './firebase-admin-auth.adapter';

import { AUTHENTICATION_PORT } from '@/ports';

@Module({
  providers: [
    {
      provide: AUTHENTICATION_PORT,
      useClass: FirebaseAdminAuthAdapter,
    },
  ],
  exports: [AUTHENTICATION_PORT],
})
export class AuthenticationModule {}
