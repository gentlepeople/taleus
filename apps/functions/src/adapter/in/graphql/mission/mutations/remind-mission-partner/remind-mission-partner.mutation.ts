import { Inject } from '@nestjs/common';
import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';

import {
  RemindMissionPartnerRequest,
  RemindMissionPartnerResponse,
} from './remind-mission-partner.dto';

import { UserAuth, checkUserPermission, GqlContext } from '@/common';
import {
  SendMissionReminderToPartnerUsecase,
  SEND_MISSION_REMINDER_TO_PARTNER_USECASE,
} from '@/ports';

@Resolver()
export class RemindMissionPartnerMutation {
  constructor(
    @Inject(SEND_MISSION_REMINDER_TO_PARTNER_USECASE)
    private readonly sendMissionReminderToPartnerUsecase: SendMissionReminderToPartnerUsecase,
  ) {}

  @Mutation(() => RemindMissionPartnerResponse)
  @UserAuth()
  async remindMissionPartner(
    @Args() args: RemindMissionPartnerRequest,
    @Context() context: GqlContext,
  ): Promise<RemindMissionPartnerResponse> {
    const { userId, coupleMissionId } = args;

    checkUserPermission(context, userId);

    const { success, message } = await this.sendMissionReminderToPartnerUsecase.execute(
      userId,
      coupleMissionId,
    );

    return { success, message };
  }
}
