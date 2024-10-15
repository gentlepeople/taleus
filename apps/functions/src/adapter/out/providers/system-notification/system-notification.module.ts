import { Module } from '@nestjs/common';

import { SystemNotificationAdapter } from './system-notification.adapter';

import { SYSTEM_NOTIFICATION_PORT } from '@/ports';

@Module({
  providers: [
    {
      provide: SYSTEM_NOTIFICATION_PORT,
      useClass: SystemNotificationAdapter,
    },
  ],
  exports: [SYSTEM_NOTIFICATION_PORT],
})
export class SystemNotificationModule {}
