import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLBigInt } from 'graphql-scalars';

@ObjectType()
export class Response {
  @Field(() => GraphQLBigInt)
  responseId: bigint;

  @Field(() => String)
  userId: string;

  @Field(() => GraphQLBigInt)
  questionId: bigint;

  @Field(() => GraphQLBigInt, { nullable: true })
  coupleMissionId?: bigint;

  @Field(() => String)
  content: string;

  @Field(() => Date)
  createdAt: Date;
}
