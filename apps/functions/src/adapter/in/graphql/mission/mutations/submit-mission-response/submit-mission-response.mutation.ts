import { Inject } from '@nestjs/common';
import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';

import {
  SubmitMissionResponseRequest,
  SubmitMissionResponseResponse,
} from './submit-mission-response.dto';

import { UserAuth, checkUserPermission, GqlContext } from '@/common';
import { SubmitMissionResponseUsecase, SUBMIT_MISSION_RESPONSE_USECASE } from '@/ports';

@Resolver()
export class SubmitMissionResponseMutation {
  constructor(
    @Inject(SUBMIT_MISSION_RESPONSE_USECASE)
    private readonly submitMissionResponseUsecase: SubmitMissionResponseUsecase,
  ) {}

  @Mutation(() => SubmitMissionResponseResponse)
  @UserAuth()
  async submitMissionResponse(
    @Args() args: SubmitMissionResponseRequest,
    @Context() context: GqlContext,
  ): Promise<SubmitMissionResponseResponse> {
    const { userId, missionId, coupleMissionId, data } = args;
    checkUserPermission(context, userId);

    const { success, message } = await this.submitMissionResponseUsecase.execute({
      userId,
      missionId,
      coupleMissionId,
      data,
    });

    return { success, message };
  }
}
