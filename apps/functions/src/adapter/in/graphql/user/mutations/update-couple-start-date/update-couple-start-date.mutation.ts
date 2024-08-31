import { Inject } from '@nestjs/common';
import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';

import {
  UpdateCoupleStartDateRequest,
  UpdateCoupleStartDateResponse,
} from './update-couple-start-date.dto';

import { Auth, checkUserPermission, GqlContext } from '@/common';
import {
  UpdateCoupleStartDateUsecase,
  UPDATE_COUPLE_START_DATE_USECASE,
  FIND_COUPLE_USECASE,
  FindCoupleUsecase,
} from '@/ports';

@Resolver()
export class UpdateCoupleStartDateMutation {
  constructor(
    @Inject(FIND_COUPLE_USECASE)
    private readonly findCoupleUsecase: FindCoupleUsecase,
    @Inject(UPDATE_COUPLE_START_DATE_USECASE)
    private readonly updateCoupleStartDateUsecase: UpdateCoupleStartDateUsecase,
  ) {}

  @Mutation(() => UpdateCoupleStartDateResponse, {
    description: "Updates the start date of a couple's relationship to a new specified date.",
  })
  @Auth()
  async updateCoupleStartDate(
    @Args() args: UpdateCoupleStartDateRequest,
    @Context() context: GqlContext,
  ): Promise<UpdateCoupleStartDateResponse> {
    const { coupleId, coupleStartDate } = args;

    const findCouple = await this.findCoupleUsecase.findOneByCoupleId(coupleId);
    const { inviteeId, inviterId } = findCouple;
    checkUserPermission(context, [inviteeId, inviterId]);

    await this.updateCoupleStartDateUsecase.execute(coupleId, coupleStartDate);

    const updateCouple = await this.findCoupleUsecase.findOneByCoupleId(coupleId);

    return { couple: updateCouple };
  }
}
