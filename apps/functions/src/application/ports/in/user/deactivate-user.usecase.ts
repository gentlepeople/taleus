export const DEACTIVATE_USER_USECASE = Symbol('DEACTIVATE_USER_USECASE');

export interface DeactivateUserUsecase {
  execute(userId: string): Promise<boolean>;
}
