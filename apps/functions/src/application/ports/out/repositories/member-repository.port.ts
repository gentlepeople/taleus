import { enum_gender } from '@gentlepeople/taleus-schema';

import { Member } from '@/domain';

export const MEMBER_REPOSITORY = Symbol('MEMBER_REPOSITORY');

export interface IMemberRepository {
  findOneByMemberId(memberId: number): Promise<Member | null>;
  createOne(object: { gender: enum_gender }): Promise<{ memberId: number }>;
}
