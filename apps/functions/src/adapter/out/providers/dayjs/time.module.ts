import { Module } from '@nestjs/common';

import { DayjsAdapter } from './dayjs.adapter';

import { TIME_PORT } from '@/ports';

@Module({
  providers: [
    {
      provide: TIME_PORT,
      useClass: DayjsAdapter,
    },
  ],
  exports: [TIME_PORT],
})
export class TimeModule {}
