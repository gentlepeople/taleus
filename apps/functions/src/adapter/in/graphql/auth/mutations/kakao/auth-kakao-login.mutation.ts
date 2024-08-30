import { Inject } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';

import { AuthKakaoLoginRequest, AuthKakaoLoginResponse } from './auth-kakao-login.dto';

import { KAKAO_LOGIN_USECASE, KakaoLoginUsecase } from '@/ports';

@Resolver()
export class AuthKakaoLoginMutation {
  constructor(
    @Inject(KAKAO_LOGIN_USECASE)
    private readonly kakaoLoginUsecase: KakaoLoginUsecase,
  ) {}

  @Mutation(() => AuthKakaoLoginResponse, {
    description: 'Authenticates a user via Kakao OAuth, registers if new.',
  })
  async authKakaoLogin(@Args() args: AuthKakaoLoginRequest): Promise<AuthKakaoLoginResponse> {
    const { accessToken } = args;
    const { userId, customToken } = await this.kakaoLoginUsecase.execute(accessToken);
    return { userId, customToken };
  }
}
