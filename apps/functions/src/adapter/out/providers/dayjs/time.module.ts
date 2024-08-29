import { Module } from '@nestjs/common';

import { DayjsService } from './dayjs.service';

import { TIME_PORT } from '@/ports';

@Module({
  providers: [
    {
      provide: TIME_PORT,
      useClass: DayjsService,
    },
  ],
  exports: [TIME_PORT],
})
export class TimeModule {}
