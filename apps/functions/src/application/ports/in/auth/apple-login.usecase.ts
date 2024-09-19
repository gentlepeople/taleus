export const APPLE_LOGIN_USECASE = Symbol('APPLE_LOGIN_USECASE');

export interface AppleLoginUsecase {
  execute(idToken: string, nonce?: string): Promise<{ userId: string; customToken: string }>;
}
