import { enum_gender, member } from '@gentlepeople/taleus-schema';
import { Inject, Injectable } from '@nestjs/common';
import isUndefined from 'lodash/isUndefined';
import { camelcaseConverter, snakecaseConverter } from 'src/common';

import { DATABASE_REPOSITORY, IDatabaseRepository } from './prisma';

import { Member } from '@/domain';
import { IMemberRepository } from '@/ports';

@Injectable()
export class MemberRepository implements IMemberRepository {
  constructor(
    @Inject(DATABASE_REPOSITORY)
    private readonly databaseRepository: IDatabaseRepository,
  ) {}

  private camelcaseConvert(object: member): Member {
    return camelcaseConverter({
      ...object,
      gender: object.gender as enum_gender,
    });
  }

  async findOneByMemberId(memberId: number): Promise<Member | null> {
    const findMember = await this.databaseRepository.member.findUnique({
      where: {
        member_id: memberId,
      },
    });

    return isUndefined(findMember) ? null : this.camelcaseConvert(findMember);
  }

  async createOne(object: { gender: enum_gender }): Promise<{ memberId: number }> {
    const memberObject = snakecaseConverter(object);
    const { member_id: memberId } = await this.databaseRepository.member.create({
      data: memberObject,
    });
    return { memberId };
  }
}
