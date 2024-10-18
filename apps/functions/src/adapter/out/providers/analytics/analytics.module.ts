import { Global, Module } from '@nestjs/common';

import { ConfigAdapter } from '../config';

import { AnalyticsAdapter } from './analytics.adapter';

import { CONFIG_PORT, ANALYTICS_PORT } from '@/ports';

@Global()
@Module({
  providers: [
    {
      inject: [CONFIG_PORT],
      provide: ANALYTICS_PORT,
      useFactory: (configAdapter: ConfigAdapter) => new AnalyticsAdapter(configAdapter),
    },
  ],
  exports: [ANALYTICS_PORT],
})
export class AnalyticsModule {}
