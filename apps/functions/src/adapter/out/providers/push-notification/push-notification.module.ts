import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { PushNotificationAdapter } from './push-notification.adapter';

import { PUSH_NOTIFICATION_PORT } from '@/ports';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: PUSH_NOTIFICATION_PORT,
      useClass: PushNotificationAdapter,
    },
  ],
  exports: [PUSH_NOTIFICATION_PORT],
})
export class PushNotificationModule {}
