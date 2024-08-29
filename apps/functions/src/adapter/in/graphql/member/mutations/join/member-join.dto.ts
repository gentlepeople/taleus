import { enum_gender } from '@gentlepeople/taleus-schema';
import { ObjectType, Field, ArgsType, OmitType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUppercase } from 'class-validator';

import { Member } from '@/domain';

@ArgsType()
export class MemberJoinRequest extends OmitType(
  Member,
  ['memberId', 'createdAt', 'updatedAt'],
  ArgsType,
) {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @IsUppercase()
  gender: enum_gender;
}

@ObjectType()
export class MemberJoinResponse {
  @Field(() => Member)
  member: Member | null;
}
