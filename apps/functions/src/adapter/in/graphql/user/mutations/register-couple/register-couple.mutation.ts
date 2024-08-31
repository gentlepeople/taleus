import { Inject } from '@nestjs/common';
import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';

import { RegisterCoupleRequest, RegisterCoupleResponse } from './register-couple.dto';

import { Auth, checkUserPermission, GqlContext } from '@/common';
import { RegisterCoupleUsecase, REGISTER_COUPLE_USECASE } from '@/ports';

@Resolver()
export class RegisterCoupleMutation {
  constructor(
    @Inject(REGISTER_COUPLE_USECASE)
    private readonly registerCoupleUsecase: RegisterCoupleUsecase,
  ) {}

  @Mutation(() => RegisterCoupleResponse, {
    description: 'Register a couple',
  })
  @Auth()
  async registerCouple(
    @Args() args: RegisterCoupleRequest,
    @Context() context: GqlContext,
  ): Promise<RegisterCoupleResponse> {
    const { inviterId, inviteePersonalCode } = args;
    checkUserPermission(context, inviterId);

    const { success, code, message } = await this.registerCoupleUsecase.execute(
      inviterId,
      inviteePersonalCode,
    );

    return { success, code, message };
  }
}
