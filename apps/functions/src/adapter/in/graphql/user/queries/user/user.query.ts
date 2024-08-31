import { Inject } from '@nestjs/common';
import { Resolver, Args, Query, Context, ResolveField, Parent } from '@nestjs/graphql';

import { UserRequest } from './user.dto';

import { Auth, checkUserPermission, GqlContext } from '@/common';
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
  async user(@Args() args: UserRequest, @Context() context: GqlContext): Promise<User | null> {
    const { userId } = args;
    checkUserPermission(context, userId);
    const findUser = await this.findUserUsecase.findOneByUserId(userId);
    return findUser;
  }

  @ResolveField(() => User, {
    description:
      "The user's partner in the couple. If the user is not in a couple, this field will be null.",
    nullable: true,
  })
  async partner(@Parent() user: User): Promise<User | null> {
    const { userId } = user;
    const partner = await this.findUserUsecase.findPartnerByUserId(userId);
    return partner;
  }
}
