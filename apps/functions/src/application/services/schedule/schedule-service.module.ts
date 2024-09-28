import { Module } from '@nestjs/common';

import { ScheduleDailyMissionService } from './schedule-daily-mission.service';

import {
  TIME_PORT,
  TimePort,
  COUPLE_MISSION_REPOSITORY,
  COUPLE_REPOSITORY,
  ICoupleMissionRepository,
  ICoupleRepository,
  IMissionRepository,
  MISSION_REPOSITORY,
  PUSH_NOTIFICATION_PORT,
  PushNotificationPort,
  SCHEDULE_DAILY_MISSION_USECASE,
  SYSTEM_NOTIFICATION_PORT,
} from '@/ports';
import {
  PushNotificationModule,
  SystemNotificationAdapter,
  SystemNotificationModule,
} from '@/providers';
import { CoupleMissionRepository, CoupleRepository, MissionRepository } from '@/repositories';

const InjectRepositories = [
  {
    provide: COUPLE_REPOSITORY,
    useClass: CoupleRepository,
  },
  {
    provide: MISSION_REPOSITORY,
    useClass: MissionRepository,
  },
  {
    provide: COUPLE_MISSION_REPOSITORY,
    useClass: CoupleMissionRepository,
  },
];

@Module({
  imports: [PushNotificationModule, SystemNotificationModule],
  providers: [
    ...InjectRepositories,
    {
      inject: [
        COUPLE_REPOSITORY,
        MISSION_REPOSITORY,
        COUPLE_MISSION_REPOSITORY,
        TIME_PORT,
        PUSH_NOTIFICATION_PORT,
        SYSTEM_NOTIFICATION_PORT,
      ],
      provide: SCHEDULE_DAILY_MISSION_USECASE,
      useFactory: (
        coupleRepository: ICoupleRepository,
        missionRepository: IMissionRepository,
        coupleMissionRepository: ICoupleMissionRepository,
        timePort: TimePort,
        pushNotificationPort: PushNotificationPort,
        systemNotificationAdapter: SystemNotificationAdapter,
      ) =>
        new ScheduleDailyMissionService(
          coupleRepository,
          missionRepository,
          coupleMissionRepository,
          timePort,
          pushNotificationPort,
          systemNotificationAdapter,
        ),
    },
  ],
  exports: [SCHEDULE_DAILY_MISSION_USECASE],
})
export class ScheduleServiceModule {}
