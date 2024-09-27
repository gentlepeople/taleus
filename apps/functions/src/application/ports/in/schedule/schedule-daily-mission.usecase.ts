export const SCHEDULE_DAILY_MISSION_USECASE = Symbol('SCHEDULE_DAILY_MISSION_USECASE');

export interface ScheduleDailyMissionUsecase {
  execute(event: { scheduleTime: string }): Promise<number>;
}
