import { Module, Provider as NestjsProvider } from '@nestjs/common';

import { DatabaseModule } from '../providers/prisma';

import { UserRepository } from './user.repository';

import { USER_REPOSITORY } from '@/ports';

const RepositoryProviders: NestjsProvider[] = [
  { provide: USER_REPOSITORY, useClass: UserRepository },
];

@Module({
  imports: [DatabaseModule],
  providers: RepositoryProviders,
  exports: [USER_REPOSITORY],
})
export class RepositoriesModule {}
