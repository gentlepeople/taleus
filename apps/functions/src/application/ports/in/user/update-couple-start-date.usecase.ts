export const UPDATE_COUPLE_START_DATE_USECASE = Symbol('UPDATE_COUPLE_START_DATE_USECASE');

export interface UpdateCoupleStartDateUsecase {
  execute(coupleId: bigint, newCoupleStartDate: Date): Promise<void>;
}
