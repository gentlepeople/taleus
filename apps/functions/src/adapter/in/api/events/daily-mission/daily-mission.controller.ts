import { Inject, Post, Controller, Req } from '@nestjs/common';

import { EventDailyMissionResponse } from './daily-mission.dto';

import { SCHEDULE_DAILY_MISSION_USECASE, ScheduleDailyMissionUsecase } from '@/ports';

@Controller('events')
export class EventDailyMissionController {
  constructor(
    @Inject(SCHEDULE_DAILY_MISSION_USECASE)
    private readonly scheduleDailyMissionUsecase: ScheduleDailyMissionUsecase,
  ) {}

  @Post('daily-mission')
  async scheduleDailyMission(@Req() req: Request): Promise<EventDailyMissionResponse> {
    const scheduleTime = req.headers['x-cloudscheduler-scheduletime'];
    const count = await this.scheduleDailyMissionUsecase.execute({
      scheduleTime,
    });
    return { count };
  }
}
