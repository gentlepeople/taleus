import { Inject } from '@nestjs/common';
import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';

import { DeleteUserRequest, DeleteUserResponse } from './delete-user.dto';

import { UserAuth, checkUserPermission, GqlContext } from '@/common';
import { DEACTIVATE_USER_USECASE, DeactivateUserUsecase } from '@/ports';

@Resolver()
export class DeleteUserMutation {
  constructor(
    @Inject(DEACTIVATE_USER_USECASE)
    private readonly deactivateUserUsecase: DeactivateUserUsecase,
  ) {}

  @Mutation(() => DeleteUserResponse, {
    description: 'Deletes a user account.',
  })
  @UserAuth()
  async deleteUser(
    @Args() args: DeleteUserRequest,
    @Context() context: GqlContext,
  ): Promise<DeleteUserResponse> {
    const { userId } = args;
    checkUserPermission(context, userId);

    const success = await this.deactivateUserUsecase.execute(userId);
    return { success };
  }
}
