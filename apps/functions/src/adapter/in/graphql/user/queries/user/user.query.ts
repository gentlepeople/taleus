import { Inject } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';

import { UserRequest } from './user.dto';

import { Auth } from '@/common';
import { User } from '@/domain';
import { FIND_USER_USECASE, FindUserUsecase } from '@/ports';

@Resolver(() => User)
export class UserQuery {
  constructor(
    @Inject(FIND_USER_USECASE)
    private readonly findUserUsecase: FindUserUsecase,
  ) {}

  @Query(() => User, {
    description: 'get one user by user id.',
    nullable: true,
  })
  @Auth()
  async user(@Args() args: UserRequest): Promise<User | null> {
    const { userId } = args;
    const findUser = await this.findUserUsecase.findOneByUserId(userId);
    return findUser;
  }
}
