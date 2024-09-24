import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLBigInt } from 'graphql-scalars';

@ObjectType()
export class Couple {
  @Field(() => GraphQLBigInt)
  coupleId: bigint;

  @Field(() => String)
  inviterId: string;

  @Field(() => String)
  inviteeId: string;

  @Field(() => Date, { nullable: true })
  startDate: Date | null;

  @Field(() => Date)
  createdAt: Date;
}
