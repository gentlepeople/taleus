import { enum_gender } from '@gentlepeople/taleus-schema';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Member {
  @Field(() => Int)
  memberId: number;

  @Field(() => String)
  gender: enum_gender | string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
