import { Inject } from '@nestjs/common';
import { Resolver, Args, Query, Context, ResolveField, Parent, Int } from '@nestjs/graphql';
import isNull from 'lodash/isNull';

import { UserRequest } from './user.dto';

import { Auth, checkUserPermission, diffDays, GqlContext } from '@/common';
import { Couple, User } from '@/domain';
import {
  FIND_COUPLE_USECASE,
  FIND_USER_USECASE,
  FindCoupleUsecase,
  FindUserUsecase,
} from '@/ports';

@Resolver(() => User)
export class UserQuery {
  constructor(
    @Inject(FIND_USER_USECASE)
    private readonly findUserUsecase: FindUserUsecase,
    @Inject(FIND_COUPLE_USECASE)
    private readonly findCoupleUsecase: FindCoupleUsecase,
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

  @ResolveField(() => Int, {
    description: 'The number of days since the user started using the app.',
  })
  async usageDays(@Parent() user: User): Promise<number> {
    const { createdAt } = user;
    const today = new Date();
    return diffDays(createdAt, today);
  }

  @ResolveField(() => Boolean, {
    description: 'Determine if the user is currently in a couple.',
  })
  async isCoupled(@Parent() user: User): Promise<boolean> {
    const { userId } = user;
    const findCouple = await this.findCoupleUsecase.findOneByUserId(userId);
    const isCoupled = !isNull(findCouple);
    return isCoupled;
  }

  @ResolveField(() => Couple, {
    nullable: true,
  })
  async couple(@Parent() user: User): Promise<Couple | null> {
    const { userId } = user;
    const findCouple = await this.findCoupleUsecase.findOneByUserId(userId);
    return findCouple;
  }
}
