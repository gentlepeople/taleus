import { Module } from '@nestjs/common';

import { ConfigAdapter } from '../config';

import { SystemNotificationAdapter } from './system-notification.adapter';

import { CONFIG_PORT, SYSTEM_NOTIFICATION_PORT } from '@/ports';

@Module({
  providers: [
    {
      inject: [CONFIG_PORT],
      provide: SYSTEM_NOTIFICATION_PORT,
      useFactory: (configAdapter: ConfigAdapter) => new SystemNotificationAdapter(configAdapter),
    },
  ],
  exports: [SYSTEM_NOTIFICATION_PORT],
})
export class SystemNotificationModule {}
