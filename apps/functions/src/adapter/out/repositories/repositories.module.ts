import { Module, Provider as NestjsProvider } from '@nestjs/common';

import { MemberRepository } from './member.repository';
import { DatabaseModule } from './prisma';

import { MEMBER_REPOSITORY } from '@/ports';

const RepositoryProviders: NestjsProvider[] = [
  { provide: MEMBER_REPOSITORY, useClass: MemberRepository },
];

@Module({
  imports: [DatabaseModule],
  providers: RepositoryProviders,
  exports: [MEMBER_REPOSITORY],
})
export class RepositoriesModule {}
