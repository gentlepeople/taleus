import { CoupleMission, Mission } from '@/domain';

export const GET_TODAY_MISSION_USECASE = Symbol('GET_TODAY_MISSION_USECASE');

export interface GetTodayMissionUsecase {
  execute(userId: string): Promise<{ mission: Mission; coupleMission: CoupleMission } | null>;
}
