import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLBigInt } from 'graphql-scalars';

@ObjectType()
export class CoupleMission {
  @Field(() => GraphQLBigInt)
  coupleMissionId: bigint;

  @Field(() => GraphQLBigInt)
  coupleId: bigint;

  @Field(() => GraphQLBigInt)
  missionId: bigint;

  @Field(() => Boolean)
  isCompleted: boolean;

  @Field(() => Int)
  reminderClickCount: number;

  @Field(() => Date)
  createdAt: Date;
}
