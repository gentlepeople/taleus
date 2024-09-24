import { Inject, Headers } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';

import { DailyMissionResponse } from './daily-mission.dto';

import { SCHEDULE_DAILY_MISSION_USECASE, ScheduleDailyMissionUsecase } from '@/ports';

@Resolver('event')
export class DailyMissionController {
  constructor(
    @Inject(SCHEDULE_DAILY_MISSION_USECASE)
    private readonly scheduleDailyMissionUsecase: ScheduleDailyMissionUsecase,
  ) {}

  @Mutation(() => DailyMissionResponse)
  async scheduleDailyMission(@Headers() headers: any): Promise<DailyMissionResponse> {
    const count = await this.scheduleDailyMissionUsecase.execute();
    return { count };
  }
}
