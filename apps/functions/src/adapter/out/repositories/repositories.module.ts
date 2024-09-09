import { Module, Provider as NestjsProvider } from '@nestjs/common';

import { CoupleMissionRepository } from './couple-mission.repository';
import { CoupleRepository } from './couple.repository';
import { MissionRepository } from './mission.repository';
import { QuestionRepository } from './question.repository';
import { ResponseRepository } from './response.repository';
import { UserRepository } from './user.repository';

import {
  COUPLE_MISSION_REPOSITORY,
  COUPLE_REPOSITORY,
  MISSION_REPOSITORY,
  QUESTION_REPOSITORY,
  RESPONSE_REPOSITORY,
  USER_REPOSITORY,
} from '@/ports';

const RepositoryProviders: NestjsProvider[] = [
  { provide: USER_REPOSITORY, useClass: UserRepository },
  { provide: COUPLE_REPOSITORY, useClass: CoupleRepository },
  { provide: MISSION_REPOSITORY, useClass: MissionRepository },
  { provide: COUPLE_MISSION_REPOSITORY, useClass: CoupleMissionRepository },
  { provide: QUESTION_REPOSITORY, useClass: QuestionRepository },
  { provide: RESPONSE_REPOSITORY, useClass: ResponseRepository },
];

@Module({
  providers: RepositoryProviders,
  exports: [
    USER_REPOSITORY,
    COUPLE_REPOSITORY,
    MISSION_REPOSITORY,
    COUPLE_MISSION_REPOSITORY,
    QUESTION_REPOSITORY,
    RESPONSE_REPOSITORY,
  ],
})
export class RepositoriesModule {}
