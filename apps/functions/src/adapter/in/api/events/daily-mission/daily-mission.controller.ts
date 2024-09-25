import { Inject, Headers, Post, Controller } from '@nestjs/common';
import { logger } from 'firebase-functions/v2';

import { EventDailyMissionResponse } from './daily-mission.dto';

import { SCHEDULE_DAILY_MISSION_USECASE, ScheduleDailyMissionUsecase } from '@/ports';

@Controller('event')
export class EventDailyMissionController {
  constructor(
    @Inject(SCHEDULE_DAILY_MISSION_USECASE)
    private readonly scheduleDailyMissionUsecase: ScheduleDailyMissionUsecase,
  ) {}

  @Post('daily-mission')
  async scheduleDailyMission(@Headers() headers: any): Promise<EventDailyMissionResponse> {
    // TODO: This log is for local testing and should not be included in production. Please comment it out.
    logger.log('[Event] Schedule Daily Mission Header: ', headers);

    const count = await this.scheduleDailyMissionUsecase.execute();
    return { count };
  }
}
