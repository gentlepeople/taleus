export const KAKAO_LOGIN_USECASE = Symbol('KAKAO_LOGIN_USECASE');

export interface KakaoLoginUsecase {
  execute(accessToken: string): Promise<{ userId: string; customToken: string }>;
}
