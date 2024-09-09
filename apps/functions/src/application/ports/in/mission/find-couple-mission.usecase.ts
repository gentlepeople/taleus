export const FIND_COUPLE_MISSION_USECASE = Symbol('FIND_COUPLE_MISSION_USECASE');

export interface FindCoupleMissionUsecase {
  countCompletedByCoupleId(coupleId: number): Promise<number>;
}
