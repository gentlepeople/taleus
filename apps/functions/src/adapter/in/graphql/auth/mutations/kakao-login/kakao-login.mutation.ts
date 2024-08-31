import { Inject } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';

import { KakaoLoginRequest, KakaoLoginResponse } from './kakao-login.dto';

import { KAKAO_LOGIN_USECASE, KakaoLoginUsecase } from '@/ports';

@Resolver()
export class KakaoLoginMutation {
  constructor(
    @Inject(KAKAO_LOGIN_USECASE)
    private readonly kakaoLoginUsecase: KakaoLoginUsecase,
  ) {}

  @Mutation(() => KakaoLoginResponse, {
    description: 'Authenticates a user via Kakao OAuth, registers if new.',
  })
  async kakaoLogin(@Args() args: KakaoLoginRequest): Promise<KakaoLoginResponse> {
    const { accessToken } = args;
    const { userId, customToken } = await this.kakaoLoginUsecase.execute(accessToken);
    return { userId, customToken };
  }
}
