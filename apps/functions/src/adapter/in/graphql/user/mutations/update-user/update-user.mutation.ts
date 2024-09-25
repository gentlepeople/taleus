import { Inject } from '@nestjs/common';
import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';

import { UpdateUserRequest, UpdateUserResponse } from './update-user.dto';

import { UserAuth, checkUserPermission, GqlContext } from '@/common';
import {
  FIND_USER_USECASE,
  FindUserUsecase,
  UPDATE_USER_USECASE,
  UpdateUserUsecase,
} from '@/ports';

@Resolver()
export class UpdateUserMutation {
  constructor(
    @Inject(UPDATE_USER_USECASE)
    private readonly updateUserUsecase: UpdateUserUsecase,
    @Inject(FIND_USER_USECASE)
    private readonly findUserUsecase: FindUserUsecase,
  ) {}

  @Mutation(() => UpdateUserResponse, {
    description:
      "Updates a user's details based on the provided userId and input fields. Only the fields specified in the input will be updated.",
  })
  @UserAuth()
  async updateUser(
    @Args() args: UpdateUserRequest,
    @Context() context: GqlContext,
  ): Promise<UpdateUserResponse> {
    const { userId, input } = args;
    checkUserPermission(context, userId);
    await this.updateUserUsecase.execute(userId, input);
    const findUser = await this.findUserUsecase.findOneByUserId(userId);
    return { user: findUser };
  }
}
