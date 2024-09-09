import { Inject } from '@nestjs/common';
import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';

import { UpdateResponseRequest, UpdateResponseResponse } from './update-response.dto';

import { Auth, checkUserPermission, GqlContext } from '@/common';
import { UpdateResponseUsecase, UPDATE_RESPONSE_USECASE } from '@/ports';

@Resolver()
export class UpdateResponseMutation {
  constructor(
    @Inject(UPDATE_RESPONSE_USECASE)
    private readonly updateResponseUsecase: UpdateResponseUsecase,
  ) {}

  @Mutation(() => UpdateResponseResponse)
  @Auth()
  async updateResponse(
    @Args() args: UpdateResponseRequest,
    @Context() context: GqlContext,
  ): Promise<UpdateResponseResponse> {
    const { userId, responseId, newContent } = args;

    checkUserPermission(context, userId);

    const updateResponse = await this.updateResponseUsecase.execute(responseId, newContent);

    return { response: updateResponse };
  }
}
