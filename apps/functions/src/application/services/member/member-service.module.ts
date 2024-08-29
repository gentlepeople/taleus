import { Module } from '@nestjs/common';

import { AddMemberUsecase, FindMemberUsecase } from './use-cases';

import { MEMBER_REPOSITORY, IMemberRepository } from '@/ports';
import { DatabaseModule, MemberRepository, RepositoriesModule } from '@/repositories';

const InjectRepositories = [
  {
    provide: MEMBER_REPOSITORY,
    useClass: MemberRepository,
  },
];

@Module({
  imports: [DatabaseModule, RepositoriesModule],
  providers: [
    ...InjectRepositories,
    {
      inject: [MEMBER_REPOSITORY],
      provide: MemberApplicationModule.ADD,
      useFactory: (memberRepository: IMemberRepository) => new AddMemberUsecase(memberRepository),
    },
    {
      inject: [MEMBER_REPOSITORY],
      provide: MemberApplicationModule.FIND,
      useFactory: (memberRepository: IMemberRepository) => new FindMemberUsecase(memberRepository),
    },
  ],
  exports: [MemberApplicationModule.ADD, MemberApplicationModule.FIND],
})
export class MemberApplicationModule {
  static ADD = AddMemberUsecase.name;
  static FIND = FindMemberUsecase.name;
}
