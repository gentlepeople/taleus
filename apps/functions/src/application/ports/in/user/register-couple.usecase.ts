export const REGISTER_COUPLE_USECASE = Symbol('REGISTER_COUPLE_USECASE');

export interface RegisterCoupleUsecase {
  execute(
    inviterId: string,
    inviteePersonalCode: string,
  ): Promise<{ success: boolean; code?: string; message?: string }>;
}
