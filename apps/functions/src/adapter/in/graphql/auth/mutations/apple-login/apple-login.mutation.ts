import { Inject } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';

import { AppleLoginRequest, AppleLoginResponse } from './apple-login.dto';

import { APPLE_LOGIN_USECASE, AppleLoginUsecase } from '@/ports';

@Resolver()
export class AppleLoginMutation {
  constructor(
    @Inject(APPLE_LOGIN_USECASE)
    private readonly appleLoginUsecase: AppleLoginUsecase,
  ) {}

  @Mutation(() => AppleLoginResponse, {
    description: 'Authenticates a user via Apple OAuth, registers if new.',
  })
  async appleLogin(@Args() args: AppleLoginRequest): Promise<AppleLoginResponse> {
    const { idToken, nonce } = args;
    const { userId, customToken } = await this.appleLoginUsecase.execute(idToken, nonce);
    return { userId, customToken };
  }
}
