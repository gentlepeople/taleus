import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { EventDailyMissionController } from './daily-mission';

import { ScheduleServiceModule } from '@/services/schedule';

@Module({
  imports: [HttpModule, ScheduleServiceModule],
  controllers: [EventDailyMissionController],
})
export class EventModule {}
