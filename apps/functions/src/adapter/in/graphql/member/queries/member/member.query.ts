import { Inject } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';

import { MemberRequest } from './member.dto';

import { Member } from '@/domain';
import { MemberApplicationModule, FindMemberUsecase } from '@/services';

@Resolver()
export class MemberQuery {
  constructor(
    @Inject(MemberApplicationModule.FIND)
    private readonly findMemberUsecase: FindMemberUsecase,
  ) {}

  @Query(() => Member, {
    description: 'get one member by member id.',
    nullable: true,
  })
  async member(@Args() args: MemberRequest): Promise<Member | null> {
    const { memberId } = args;
    const findMember = await this.findMemberUsecase.findOneByMemberId(memberId);
    return findMember;
  }
}
