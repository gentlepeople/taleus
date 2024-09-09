import { Inject } from '@nestjs/common';
import { Resolver, Args, Context, Query } from '@nestjs/graphql';
import isNull from 'lodash/isNull';

import { TodayMissionRequest, TodayMissionResponse } from './today-mission.dto';

import { Auth, checkUserPermission, GqlContext } from '@/common';
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
  @Auth()
  async todayMission(
    @Args() args: TodayMissionRequest,
    @Context() context: GqlContext,
  ): Promise<TodayMissionResponse | null> {
    const { userId } = args;
    checkUserPermission(context, userId);

    const getTodayMission = await this.getTodayMissionUsecase.execute(userId);
    if (isNull(getTodayMission)) {
      return null;
    }

    const {
      mission,
      coupleMission: { coupleMissionId },
    } = getTodayMission;

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
