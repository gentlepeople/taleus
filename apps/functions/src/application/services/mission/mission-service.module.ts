import { Module } from '@nestjs/common';

import {
  FindCoupleMissionService,
  FindMissionService,
  FindQuestionService,
  FindResponseService,
  GetTodayMissionService,
} from '.';

import {
  COUPLE_MISSION_REPOSITORY,
  FIND_COUPLE_MISSION_USECASE,
  FIND_MISSION_USECASE,
  FIND_QUESTION_USECASE,
  FIND_RESPONSE_USECASE,
  GET_TODAY_MISSION_USECASE,
  ICoupleMissionRepository,
  IMissionRepository,
  IQuestionRepository,
  IResponseRepository,
  MISSION_REPOSITORY,
  QUESTION_REPOSITORY,
  RESPONSE_REPOSITORY,
} from '@/ports';
import {
  CoupleMissionRepository,
  MissionRepository,
  QuestionRepository,
  ResponseRepository,
} from '@/repositories';

const InjectRepositories = [
  {
    provide: COUPLE_MISSION_REPOSITORY,
    useClass: CoupleMissionRepository,
  },
  {
    provide: MISSION_REPOSITORY,
    useClass: MissionRepository,
  },
  {
    provide: QUESTION_REPOSITORY,
    useClass: QuestionRepository,
  },
  {
    provide: RESPONSE_REPOSITORY,
    useClass: ResponseRepository,
  },
];

@Module({
  providers: [
    ...InjectRepositories,
    {
      inject: [COUPLE_MISSION_REPOSITORY],
      provide: FIND_COUPLE_MISSION_USECASE,
      useFactory: (coupleMissionRepository: ICoupleMissionRepository) =>
        new FindCoupleMissionService(coupleMissionRepository),
    },
    {
      inject: [MISSION_REPOSITORY],
      provide: FIND_MISSION_USECASE,
      useFactory: (missionRepository: IMissionRepository) =>
        new FindMissionService(missionRepository),
    },
    {
      inject: [QUESTION_REPOSITORY],
      provide: FIND_QUESTION_USECASE,
      useFactory: (questionRepository: IQuestionRepository) =>
        new FindQuestionService(questionRepository),
    },
    {
      inject: [COUPLE_MISSION_REPOSITORY, MISSION_REPOSITORY],
      provide: GET_TODAY_MISSION_USECASE,
      useFactory: (
        coupleMissionRepository: ICoupleMissionRepository,
        missionRepository: IMissionRepository,
      ) => new GetTodayMissionService(coupleMissionRepository, missionRepository),
    },
    {
      inject: [RESPONSE_REPOSITORY],
      provide: FIND_RESPONSE_USECASE,
      useFactory: (responseRepository: IResponseRepository) =>
        new FindResponseService(responseRepository),
    },
  ],
  exports: [
    FIND_COUPLE_MISSION_USECASE,
    FIND_MISSION_USECASE,
    FIND_QUESTION_USECASE,
    GET_TODAY_MISSION_USECASE,
    FIND_RESPONSE_USECASE,
  ],
})
export class MissionServiceModule {}
