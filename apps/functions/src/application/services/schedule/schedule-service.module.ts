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
  MESSAGING_PORT,
  MessagingPort,
} from '@/ports';
import { MessagingModule } from '@/providers';
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
  imports: [MessagingModule],
  providers: [
    ...InjectRepositories,
    {
      inject: [
        COUPLE_REPOSITORY,
        MISSION_REPOSITORY,
        COUPLE_MISSION_REPOSITORY,
        TIME_PORT,
        MESSAGING_PORT,
      ],
      provide: ScheduleDailyMissionService,
      useFactory: (
        coupleRepository: ICoupleRepository,
        missionRepository: IMissionRepository,
        coupleMissionRepository: ICoupleMissionRepository,
        timePort: TimePort,
        messagingPort: MessagingPort,
      ) =>
        new ScheduleDailyMissionService(
          coupleRepository,
          missionRepository,
          coupleMissionRepository,
          timePort,
          messagingPort,
        ),
    },
  ],
  exports: [ScheduleDailyMissionService],
})
export class ScheduleServiceModule {}
