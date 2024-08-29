import { enum_gender } from '@gentlepeople/taleus-schema';
import { Inject, Injectable } from '@nestjs/common';

import { IMemberRepository, MEMBER_REPOSITORY } from '@/ports';

@Injectable()
export class AddMemberUsecase {
  constructor(
    @Inject(MEMBER_REPOSITORY)
    private readonly memberRepository: IMemberRepository,
  ) {}

  async execute(object: { gender: enum_gender }): Promise<number> {
    const { memberId } = await this.memberRepository.createOne(object);
    return memberId;
  }
}
