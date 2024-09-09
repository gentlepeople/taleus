import { Mission } from '@/domain';

export const MISSION_REPOSITORY = Symbol('MISSION_REPOSITORY');

export interface IMissionRepository {
  findAll(): Promise<Mission[]>;
  findOneByMissionId(missionId: number): Promise<Mission | null>;
}
