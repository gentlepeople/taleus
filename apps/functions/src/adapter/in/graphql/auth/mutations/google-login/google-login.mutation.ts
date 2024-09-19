import { Inject } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';

import { GoogleLoginRequest, GoogleLoginResponse } from './google-login.dto';

import { GOOGLE_LOGIN_USECASE, GoogleLoginUsecase } from '@/ports';

@Resolver()
export class GoogleLoginMutation {
  constructor(
    @Inject(GOOGLE_LOGIN_USECASE)
    private readonly googleLoginUsecase: GoogleLoginUsecase,
  ) {}

  @Mutation(() => GoogleLoginResponse, {
    description: 'Authenticates a user via Google OAuth, registers if new.',
  })
  async googleLogin(@Args() args: GoogleLoginRequest): Promise<GoogleLoginResponse> {
    const { idToken } = args;
    const { userId, customToken } = await this.googleLoginUsecase.execute(idToken);
    return { userId, customToken };
  }
}
