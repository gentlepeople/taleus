export const COUPLE_MISSION_REPOSITORY = Symbol('COUPLE_MISSION_REPOSITORY');

export interface ICoupleMissionRepository {
  createMany(
    data: {
      coupleId: number;
      missionId: number;
    }[],
  ): Promise<number>;
}
