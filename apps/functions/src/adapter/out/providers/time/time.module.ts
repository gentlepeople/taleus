import { Global, Module } from '@nestjs/common';

import { TimeAdapter } from './time.adapter';

import { TIME_PORT } from '@/ports';

@Global()
@Module({
  providers: [
    {
      provide: TIME_PORT,
      useClass: TimeAdapter,
    },
  ],
  exports: [TIME_PORT],
})
export class TimeModule {}
