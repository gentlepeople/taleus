import { Module } from '@nestjs/common';

import { OneSignalAdapter } from './one-signal.adapter';

import { MESSAGING_PORT } from '@/ports';

@Module({
  providers: [
    {
      provide: MESSAGING_PORT,
      useClass: OneSignalAdapter,
    },
  ],
  exports: [MESSAGING_PORT],
})
export class MessagingModule {}
