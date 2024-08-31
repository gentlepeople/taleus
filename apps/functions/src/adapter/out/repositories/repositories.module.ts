import { Module, Provider as NestjsProvider } from '@nestjs/common';

import { UserRepository } from './user.repository';

import { USER_REPOSITORY } from '@/ports';

const RepositoryProviders: NestjsProvider[] = [
  { provide: USER_REPOSITORY, useClass: UserRepository },
];

@Module({
  providers: RepositoryProviders,
  exports: [USER_REPOSITORY],
})
export class RepositoriesModule {}
