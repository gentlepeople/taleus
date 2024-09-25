import { Inject } from '@nestjs/common';
import { Resolver, Args, Query, Context, ResolveField, Parent, Int } from '@nestjs/graphql';
import isNull from 'lodash/isNull';

import { CoupleRequest } from './couple.dto';

import { UserAuth, checkUserPermission, diffDays, GqlContext } from '@/common';
import { Couple } from '@/domain';
import {
  FIND_COUPLE_MISSION_USECASE,
  FIND_COUPLE_USECASE,
  FindCoupleMissionUsecase,
  FindCoupleUsecase,
  TIME_PORT,
  TimePort,
} from '@/ports';

@Resolver(() => Couple)
export class CoupleQuery {
  constructor(
    @Inject(FIND_COUPLE_USECASE)
    private readonly findCoupleUsecase: FindCoupleUsecase,
    @Inject(FIND_COUPLE_MISSION_USECASE)
    private readonly findCoupleMissionUsecase: FindCoupleMissionUsecase,
    @Inject(TIME_PORT)
    private readonly timePort: TimePort,
  ) {}

  @Query(() => Couple, {
    nullable: true,
  })
  @UserAuth()
  async couple(
    @Args() args: CoupleRequest,
    @Context() context: GqlContext,
  ): Promise<Couple | null> {
    const { coupleId } = args;
    const findCouple = await this.findCoupleUsecase.findOneByCoupleId(coupleId);
    const { inviteeId, inviterId } = findCouple;
    checkUserPermission(context, [inviteeId, inviterId]);

    return findCouple;
  }

  @ResolveField(() => Int, {
    description: 'The number of days since the user formed a couple.',
  })
  async relationshipDays(@Parent() couple: Couple): Promise<number> {
    const { startDate } = couple;
    if (isNull(startDate)) {
      return -1;
    }

    const today = this.timePort.get();
    return diffDays(startDate, today);
  }

  @ResolveField(() => Int, {
    description: 'The number of missions this couple has completed.',
  })
  async completedMissionCount(@Parent() couple: Couple): Promise<number> {
    const { coupleId } = couple;
    const coupleCompletedMissionCount =
      await this.findCoupleMissionUsecase.countCompletedByCoupleId(coupleId);
    return coupleCompletedMissionCount;
  }
}
