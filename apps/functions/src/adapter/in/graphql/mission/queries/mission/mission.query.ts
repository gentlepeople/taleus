import { Inject } from '@nestjs/common';
import { Resolver, Args, Query, Parent, ResolveField } from '@nestjs/graphql';

import { MissionRequest } from './mission.dto';

import { Mission, Question } from '@/domain';
import {
  FIND_MISSION_USECASE,
  FIND_QUESTION_USECASE,
  FindMissionUsecase,
  FindQuestionUsecase,
} from '@/ports';

@Resolver(() => Mission)
export class MissionQuery {
  constructor(
    @Inject(FIND_MISSION_USECASE)
    private readonly findMissionUsecase: FindMissionUsecase,
    @Inject(FIND_QUESTION_USECASE)
    private readonly findQuestionUsecase: FindQuestionUsecase,
  ) {}

  @Query(() => Mission, { nullable: true })
  async mission(@Args() args: MissionRequest): Promise<Mission | null> {
    const { missionId } = args;
    const findMission = await this.findMissionUsecase.findOneByMissionId(missionId);

    return findMission;
  }

  @ResolveField(() => [Question])
  async questions(@Parent() mission: Mission): Promise<Question[]> {
    const { missionId } = mission;
    const findQuestions = await this.findQuestionUsecase.findManyByMissionId(missionId);
    return findQuestions;
  }
}
