import { Module } from '@nestjs/common';

import { ConfigAdapter } from '../config';

import { CloudSchedulerAdapter } from './cloud-scheduler.adapter';

import { CLOUD_SCHEDULER_PORT, CONFIG_PORT } from '@/ports';

@Module({
  providers: [
    {
      inject: [CONFIG_PORT],
      provide: CLOUD_SCHEDULER_PORT,
      useFactory: (configAdapter: ConfigAdapter) => new CloudSchedulerAdapter(configAdapter),
    },
  ],
  exports: [CLOUD_SCHEDULER_PORT],
})
export class CloudSchedulerModule {}
