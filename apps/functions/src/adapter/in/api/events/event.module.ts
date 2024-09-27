import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { EventDailyMissionController } from './daily-mission';

import { CloudSchedulerMiddleware } from '@/common';
import { ScheduleServiceModule } from '@/services/schedule';

@Module({
  imports: [HttpModule, ScheduleServiceModule],
  controllers: [EventDailyMissionController],
})
export class EventModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CloudSchedulerMiddleware)
      .forRoutes({ path: 'events/daily-mission', method: RequestMethod.POST });
  }
}
