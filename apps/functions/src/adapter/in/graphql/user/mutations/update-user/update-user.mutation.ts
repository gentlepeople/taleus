import { Inject } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';

import { UpdateUserRequest, UpdateUserResponse } from './update-user.dto';

import { Auth } from '@/common';
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
  @Auth()
  async UpdateUser(@Args() args: UpdateUserRequest): Promise<UpdateUserResponse> {
    const { userId, input } = args;
    await this.updateUserUsecase.execute(userId, input);
    const findUser = await this.findUserUsecase.findOneByUserId(userId);
    return { user: findUser };
  }
}
