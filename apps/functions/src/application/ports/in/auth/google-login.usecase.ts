export const GOOGLE_LOGIN_USECASE = Symbol('GOOGLE_LOGIN_USECASE');

export interface GoogleLoginUsecase {
  execute(idToken: string): Promise<{ userId: string; customToken: string }>;
}
