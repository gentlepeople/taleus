import { Module } from '@nestjs/common';

import { UpdateResponseService } from './update-response.service';

import {
  FindCoupleMissionService,
  FindMissionService,
  FindQuestionService,
  FindResponseService,
  GetTodayCoupleMissionService,
  SendMissionReminderToPartnerService,
  SubmitMissionResponseService,
} from '.';

import {
  COUPLE_MISSION_REPOSITORY,
  FIND_COUPLE_MISSION_USECASE,
  FIND_MISSION_USECASE,
  FIND_QUESTION_USECASE,
  FIND_RESPONSE_USECASE,
  GET_TODAY_MISSION_USECASE,
  ICoupleMissionRepository,
  IMissionReminderRepository,
  IMissionRepository,
  IQuestionRepository,
  IResponseRepository,
  IUserRepository,
  MISSION_REMINDER_REPOSITORY,
  MISSION_REPOSITORY,
  PUSH_NOTIFICATION_PORT,
  PushNotificationPort,
  QUESTION_REPOSITORY,
  RESPONSE_REPOSITORY,
  SEND_MISSION_REMINDER_TO_PARTNER_USECASE,
  SUBMIT_MISSION_RESPONSE_USECASE,
  TIME_PORT,
  TimePort,
  UPDATE_RESPONSE_USECASE,
  USER_REPOSITORY,
} from '@/ports';
import { PushNotificationModule } from '@/providers';
import {
  CoupleMissionRepository,
  MissionReminderRepository,
  MissionRepository,
  QuestionRepository,
  ResponseRepository,
  UserRepository,
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
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository,
  },
  {
    provide: MISSION_REMINDER_REPOSITORY,
    useClass: MissionReminderRepository,
  },
];

@Module({
  imports: [PushNotificationModule],
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
      ) => new GetTodayCoupleMissionService(coupleMissionRepository, missionRepository),
    },
    {
      inject: [RESPONSE_REPOSITORY],
      provide: FIND_RESPONSE_USECASE,
      useFactory: (responseRepository: IResponseRepository) =>
        new FindResponseService(responseRepository),
    },
    {
      inject: [RESPONSE_REPOSITORY, COUPLE_MISSION_REPOSITORY, USER_REPOSITORY],
      provide: SUBMIT_MISSION_RESPONSE_USECASE,
      useFactory: (
        responseRepository: IResponseRepository,
        coupleMissionRepository: ICoupleMissionRepository,
        userRepository: IUserRepository,
      ) =>
        new SubmitMissionResponseService(
          responseRepository,
          coupleMissionRepository,
          userRepository,
        ),
    },
    {
      inject: [RESPONSE_REPOSITORY],
      provide: UPDATE_RESPONSE_USECASE,
      useFactory: (responseRepository: IResponseRepository) =>
        new UpdateResponseService(responseRepository),
    },
    {
      inject: [
        USER_REPOSITORY,
        COUPLE_MISSION_REPOSITORY,
        MISSION_REMINDER_REPOSITORY,
        RESPONSE_REPOSITORY,
        PUSH_NOTIFICATION_PORT,
        TIME_PORT,
      ],
      provide: SEND_MISSION_REMINDER_TO_PARTNER_USECASE,
      useFactory: (
        userRepository: IUserRepository,
        coupleMissionRepository: ICoupleMissionRepository,
        missionReminderRepository: IMissionReminderRepository,
        responseRepository: IResponseRepository,
        pushNotificationPort: PushNotificationPort,
        timePort: TimePort,
      ) =>
        new SendMissionReminderToPartnerService(
          userRepository,
          coupleMissionRepository,
          missionReminderRepository,
          responseRepository,
          pushNotificationPort,
          timePort,
        ),
    },
  ],
  exports: [
    FIND_COUPLE_MISSION_USECASE,
    FIND_MISSION_USECASE,
    FIND_QUESTION_USECASE,
    GET_TODAY_MISSION_USECASE,
    FIND_RESPONSE_USECASE,
    SUBMIT_MISSION_RESPONSE_USECASE,
    UPDATE_RESPONSE_USECASE,
    SEND_MISSION_REMINDER_TO_PARTNER_USECASE,
  ],
})
export class MissionServiceModule {}
