import { Module, Provider as NestjsProvider } from '@nestjs/common';

import { CoupleRepository } from './couple.repository';
import { UserRepository } from './user.repository';

import { COUPLE_REPOSITORY, USER_REPOSITORY } from '@/ports';

const RepositoryProviders: NestjsProvider[] = [
  { provide: USER_REPOSITORY, useClass: UserRepository },
  { provide: COUPLE_REPOSITORY, useClass: CoupleRepository },
];

@Module({
  providers: RepositoryProviders,
  exports: [USER_REPOSITORY, COUPLE_REPOSITORY],
})
export class RepositoriesModule {}
