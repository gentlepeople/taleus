import { Inject } from '@nestjs/common';
import { Resolver, Args, Query, Context } from '@nestjs/graphql';
import isNull from 'lodash/isNull';

import { MissionLogRequest, MissionLogResponse } from './mission-log.dto';

import { UserAuth, checkUserPermission, GqlContext } from '@/common';
import { Response } from '@/domain';
import {
  FIND_COUPLE_MISSION_USECASE,
  FIND_COUPLE_USECASE,
  FIND_MISSION_USECASE,
  FIND_QUESTION_USECASE,
  FIND_RESPONSE_USECASE,
  FIND_USER_USECASE,
  FindCoupleMissionUsecase,
  FindCoupleUsecase,
  FindMissionUsecase,
  FindQuestionUsecase,
  FindResponseUsecase,
  FindUserUsecase,
  GET_TODAY_MISSION_USECASE,
  GetTodayCoupleMissionUsecase,
} from '@/ports';

@Resolver()
export class MissionLogQuery {
  constructor(
    @Inject(FIND_MISSION_USECASE)
    private readonly findMissionUsecase: FindMissionUsecase,
    @Inject(FIND_COUPLE_USECASE)
    private readonly findCoupleUsecase: FindCoupleUsecase,
    @Inject(FIND_QUESTION_USECASE)
    private readonly findQuestionUsecase: FindQuestionUsecase,
    @Inject(GET_TODAY_MISSION_USECASE)
    private readonly getTodayCoupleMissionUsecase: GetTodayCoupleMissionUsecase,
    @Inject(FIND_QUESTION_USECASE)
    private readonly findQUestionUsecase: FindQuestionUsecase,
    @Inject(FIND_RESPONSE_USECASE)
    private readonly findResponseUsecase: FindResponseUsecase,
    @Inject(FIND_USER_USECASE)
    private readonly findUserUsecase: FindUserUsecase,
    @Inject(FIND_COUPLE_MISSION_USECASE)
    private readonly findCoupleMissionUsecase: FindCoupleMissionUsecase,
  ) {}

  @Query(() => MissionLogResponse)
  @UserAuth()
  async missionLog(
    @Args() args: MissionLogRequest,
    @Context() context: GqlContext,
  ): Promise<MissionLogResponse> {
    const { userId, shuffle, take, skip } = args;
    checkUserPermission(context, userId);

    const findPartner = await this.findUserUsecase.findPartnerByUserId(userId);
    if (isNull(findPartner)) {
      return {
        data: [],
      };
    }
    const { userId: partnerId } = findPartner;

    const completedCoupleMissions = await this.findCoupleMissionUsecase.findCompletedByUserId(
      userId,
      {
        shuffle,
        pagination: {
          take,
          skip,
        },
      },
    );

    const completedCoupleMissionIds = completedCoupleMissions.map(
      ({ coupleMissionId }) => coupleMissionId,
    );

    const getResponses = await this.findResponseUsecase.findManyByCoupleMissionIdsAndUserIds(
      completedCoupleMissionIds,
      [userId, partnerId],
    );

    const responseMap = new Map<string, Response>();
    getResponses.forEach((response) => {
      const key = `${response.coupleMissionId}-${response.questionId}-${response.userId}`;
      responseMap.set(key, response);
    });

    const result = completedCoupleMissions.map(({ coupleMissionId, mission }) => {
      const questionData = mission.question.map((question) => {
        const { questionId } = question;

        const userResponseKey = `${coupleMissionId}-${questionId}-${userId}`;
        const partnerResponseKey = `${coupleMissionId}-${questionId}-${partnerId}`;

        const userResponse = responseMap.get(userResponseKey);
        const partnerResponse = responseMap.get(partnerResponseKey);

        return {
          question,
          userResponse,
          partnerResponse,
        };
      });

      return {
        mission,
        data: questionData,
      };
    });

    return { data: result };
  }
}
