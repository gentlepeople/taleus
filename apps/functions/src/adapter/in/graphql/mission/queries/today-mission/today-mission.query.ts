import { Inject } from '@nestjs/common';
import { Resolver, Args, Context, Query } from '@nestjs/graphql';
import isNull from 'lodash/isNull';

import { TodayCoupleMissionRequest, TodayCoupleMissionResponse } from './today-mission.dto';

import { UserAuth, checkUserPermission, GqlContext } from '@/common';
import {
  GET_TODAY_MISSION_USECASE,
  GetTodayCoupleMissionUsecase,
  FIND_RESPONSE_USECASE,
  FindResponseUsecase,
  FIND_USER_USECASE,
  FindUserUsecase,
  FIND_QUESTION_USECASE,
  FindQuestionUsecase,
} from '@/ports';

@Resolver()
export class TodayCoupleMissionQuery {
  constructor(
    @Inject(GET_TODAY_MISSION_USECASE)
    private readonly getTodayCoupleMissionUsecase: GetTodayCoupleMissionUsecase,
    @Inject(FIND_QUESTION_USECASE)
    private readonly findQuestionUsecase: FindQuestionUsecase,
    @Inject(FIND_RESPONSE_USECASE)
    private readonly findResponseUsecase: FindResponseUsecase,
    @Inject(FIND_USER_USECASE)
    private readonly findUserUsecase: FindUserUsecase,
  ) {}

  @Query(() => TodayCoupleMissionResponse, { nullable: true })
  @UserAuth()
  async todayCoupleMission(
    @Args() args: TodayCoupleMissionRequest,
    @Context() context: GqlContext,
  ): Promise<TodayCoupleMissionResponse | null> {
    const { userId } = args;
    checkUserPermission(context, userId);

    const getTodayCoupleMission = await this.getTodayCoupleMissionUsecase.execute(userId);
    if (isNull(getTodayCoupleMission)) {
      return null;
    }

    const {
      mission,
      coupleMission: { coupleMissionId },
    } = getTodayCoupleMission;

    const { missionId } = mission;

    const missionQuestionSize = await this.findQuestionUsecase.countByMissionId(missionId);

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

    const userCompleted = userResponses.length == missionQuestionSize;
    const partnerCompleted = partnerResponses.length == missionQuestionSize;
    const coupleCompleted = userCompleted && partnerCompleted;

    return {
      mission,
      coupleCompleted,
      userStatus: {
        isCompleted: userCompleted,
        responses: userResponses,
      },
      partnerStatus: {
        isCompleted: userCompleted,
        responses: partnerResponses,
      },
    };
  }
}
