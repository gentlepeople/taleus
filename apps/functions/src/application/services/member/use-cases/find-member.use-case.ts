import { Inject, Injectable } from '@nestjs/common';

import { Member } from '@/domain';
import { IMemberRepository, MEMBER_REPOSITORY } from '@/ports';

@Injectable()
export class FindMemberUsecase {
  constructor(
    @Inject(MEMBER_REPOSITORY)
    private readonly memberRepository: IMemberRepository,
  ) {}

  async findOneByMemberId(member_id: number): Promise<Member> {
    const findMember = await this.memberRepository.findOneByMemberId(member_id);
    return findMember;
  }
}
