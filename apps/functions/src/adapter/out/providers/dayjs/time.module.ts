import { Global, Module } from '@nestjs/common';

import { DayjsAdapter } from './dayjs.adapter';

import { TIME_PORT } from '@/ports';

@Global()
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
