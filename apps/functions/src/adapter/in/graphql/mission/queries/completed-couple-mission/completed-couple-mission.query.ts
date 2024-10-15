import { Inject } from '@nestjs/common';
import { Resolver, Args, Query, Context } from '@nestjs/graphql';
import isNull from 'lodash/isNull';

import {
  CompletedCoupleMissionRequest,
  CompletedCoupleMissionResponse,
  CompletedCoupleMissionsRequest,
  CompletedCoupleMissionsResponse,
} from './completed-couple-mission.dto';

import { UserAuth, checkUserPermission, GqlContext } from '@/common';
import { Response } from '@/domain';
import {
  FIND_COUPLE_MISSION_USECASE,
  FIND_RESPONSE_USECASE,
  FIND_USER_USECASE,
  FindCoupleMissionUsecase,
  FindResponseUsecase,
  FindUserUsecase,
} from '@/ports';

@Resolver()
export class CompletedCoupleMissionQuery {
  constructor(
    @Inject(FIND_RESPONSE_USECASE)
    private readonly findResponseUsecase: FindResponseUsecase,
    @Inject(FIND_USER_USECASE)
    private readonly findUserUsecase: FindUserUsecase,
    @Inject(FIND_COUPLE_MISSION_USECASE)
    private readonly findCoupleMissionUsecase: FindCoupleMissionUsecase,
  ) {}

  @Query(() => CompletedCoupleMissionResponse, { nullable: true })
  @UserAuth()
  async completedCoupleMission(
    @Args() args: CompletedCoupleMissionRequest,
    @Context() context: GqlContext,
  ): Promise<CompletedCoupleMissionResponse | null> {
    const { userId, coupleMissionId } = args;
    checkUserPermission(context, userId);

    const completedCoupleMission =
      await this.findCoupleMissionUsecase.findOneIncludingQuestionByCoupleMissionId(
        coupleMissionId,
      );
    if (isNull(completedCoupleMission)) return null;

    const getUserResponses = await this.findResponseUsecase.findManyByUserIdAndCoupleMissionId(
      userId,
      coupleMissionId,
    );

    const findPartner = await this.findUserUsecase.findPartnerByUserId(userId);
    const { userId: partnerId, isDeleted: partnerIsDeleted } = findPartner;

    const getPartnerResponses = partnerIsDeleted
      ? []
      : await this.findResponseUsecase.findManyByUserIdAndCoupleMissionId(
          partnerId,
          coupleMissionId,
        );

    const responseMap = new Map<string, Response>();
    [...getUserResponses, ...getPartnerResponses].forEach((response) => {
      const key = `${response.questionId}-${response.userId}`;
      responseMap.set(key, response);
    });

    const { mission } = completedCoupleMission;
    const questionData = mission.question.map((question) => {
      const { questionId } = question;

      const userResponseKey = `${questionId}-${userId}`;
      const partnerResponseKey = `${questionId}-${partnerId}`;

      const userResponse = responseMap.get(userResponseKey);
      const partnerResponse = responseMap.get(partnerResponseKey) || null;

      return {
        question,
        userResponse,
        partnerResponse,
      };
    });

    return {
      mission: mission,
      coupleMission: completedCoupleMission,
      data: questionData,
    };
  }

  @Query(() => CompletedCoupleMissionsResponse)
  @UserAuth()
  async completedCoupleMissions(
    @Args() args: CompletedCoupleMissionsRequest,
    @Context() context: GqlContext,
  ): Promise<CompletedCoupleMissionsResponse> {
    const { userId, shuffle, take, skip } = args;
    checkUserPermission(context, userId);

    const findPartner = await this.findUserUsecase.findPartnerByUserId(userId);
    if (isNull(findPartner)) {
      return {
        totalCount: 0,
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

    const result = completedCoupleMissions.map((coupleMission) => {
      const { coupleMissionId, mission } = coupleMission;
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
        coupleMission,
        data: questionData,
      };
    });

    const totalCount = await this.findCoupleMissionUsecase.countCompletedByUserId(userId);

    return { data: result, totalCount };
  }
}
