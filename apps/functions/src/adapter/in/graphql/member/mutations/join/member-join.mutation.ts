import { Inject } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';

import { MemberJoinRequest, MemberJoinResponse } from './member-join.dto';

import { MemberApplicationModule, AddMemberUsecase, FindMemberUsecase } from '@/services';

@Resolver()
export class MemberJoinMutation {
  constructor(
    @Inject(MemberApplicationModule.ADD)
    private readonly addMemberUsecase: AddMemberUsecase,
    @Inject(MemberApplicationModule.FIND)
    private readonly findMemberUsecase: FindMemberUsecase,
  ) {}

  @Mutation(() => MemberJoinResponse, {
    description: 'Add new version of task assessment data in the "DRAFT" content status.',
  })
  async memberJoin(@Args() args: MemberJoinRequest): Promise<MemberJoinResponse> {
    const memberId = await this.addMemberUsecase.execute(args);
    const findMember = await this.findMemberUsecase.findOneByMemberId(memberId);
    return { member: findMember };
  }
}
