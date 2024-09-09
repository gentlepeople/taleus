import { Module } from '@nestjs/common';

import { FindCoupleMissionService } from '.';

import {
  COUPLE_MISSION_REPOSITORY,
  FIND_COUPLE_MISSION_USECASE,
  ICoupleMissionRepository,
} from '@/ports';
import { CoupleMissionRepository } from '@/repositories';

const InjectRepositories = [
  {
    provide: COUPLE_MISSION_REPOSITORY,
    useClass: CoupleMissionRepository,
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
  ],
  exports: [FIND_COUPLE_MISSION_USECASE],
})
export class MissionServiceModule {}
