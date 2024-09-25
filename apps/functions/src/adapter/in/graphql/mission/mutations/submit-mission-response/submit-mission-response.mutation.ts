import { Inject } from '@nestjs/common';
import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import uniqBy from 'lodash/uniqBy';

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
    const { data } = args;
    const emptyInput = data.length == 0;
    if (emptyInput) {
      return {
        success: false,
      };
    }
    const uniqueUserIds = uniqBy(data, 'userId').map(({ userId }) => userId);
    checkUserPermission(context, uniqueUserIds);

    const success = await this.submitMissionResponseUsecase.execute(data);

    return { success };
  }
}
