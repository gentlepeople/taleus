import { Inject } from '@nestjs/common';
import { Resolver, Args, Context, Query } from '@nestjs/graphql';
import isNull from 'lodash/isNull';

import { TodayMissionRequest, TodayMissionResponse } from './today-mission.dto';

import { UserAuth, checkUserPermission, GqlContext } from '@/common';
import {
  GET_TODAY_MISSION_USECASE,
  GetTodayMissionUsecase,
  FIND_RESPONSE_USECASE,
  FindResponseUsecase,
  FIND_USER_USECASE,
  FindUserUsecase,
  FIND_QUESTION_USECASE,
  FindQuestionUsecase,
} from '@/ports';

@Resolver()
export class TodayMissionQuery {
  constructor(
    @Inject(GET_TODAY_MISSION_USECASE)
    private readonly getTodayMissionUsecase: GetTodayMissionUsecase,
    @Inject(FIND_QUESTION_USECASE)
    private readonly findQuestionUsecase: FindQuestionUsecase,
    @Inject(FIND_RESPONSE_USECASE)
    private readonly findResponseUsecase: FindResponseUsecase,
    @Inject(FIND_USER_USECASE)
    private readonly findUserUsecase: FindUserUsecase,
  ) {}

  @Query(() => TodayMissionResponse, { nullable: true })
  @UserAuth()
  async todayMission(
    @Args() args: TodayMissionRequest,
    @Context() context: GqlContext,
  ): Promise<TodayMissionResponse | null> {
    const { userId } = args;
    checkUserPermission(context, userId);

    const getResponse = await this.getTodayMissionUsecase.execute(userId);
    if (isNull(getResponse)) {
      return null;
    }

    const { mission: todayMission, coupleMission } = getResponse;

    const missionQuestionSize = await this.findQuestionUsecase.countByMissionId(
      todayMission.missionId,
    );

    const notCouple = isNull(coupleMission);
    if (notCouple) {
      const userResponses = await this.findResponseUsecase.findOnboardingResponseByUserId(userId);
      const userCompleted = userResponses.length >= missionQuestionSize;
      return {
        mission: todayMission,
        userResponse: {
          isCompleted: userCompleted,
          data: userResponses,
        },
        coupleMission: null,
        partnerResponse: null,
      };
    }

    const { coupleMissionId } = coupleMission;

    const userResponses = await this.findResponseUsecase.findManyByUserIdAndCoupleMissionId(
      userId,
      coupleMissionId,
    );

    const partner = await this.findUserUsecase.findPartnerByUserId(userId);
    const partnerResponses = isNull(partner)
      ? []
      : await this.findResponseUsecase.findManyByUserIdAndCoupleMissionId(
          partner.userId,
          coupleMissionId,
        );
    const userCompleted = userResponses.length >= missionQuestionSize;
    const partnerCompleted = partnerResponses.length >= missionQuestionSize;

    return {
      mission: todayMission,
      coupleMission,
      userResponse: {
        isCompleted: userCompleted,
        data: userResponses,
      },
      partnerResponse: {
        isCompleted: partnerCompleted,
        data: partnerResponses,
      },
    };
  }
}
