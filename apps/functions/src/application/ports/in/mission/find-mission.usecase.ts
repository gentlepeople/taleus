import { Mission } from '@/domain';

export const FIND_MISSION_USECASE = Symbol('FIND_MISSION_USECASE');

export interface FindMissionUsecase {
  findOneByMissionId(missionId: bigint): Promise<Mission | null>;
}
