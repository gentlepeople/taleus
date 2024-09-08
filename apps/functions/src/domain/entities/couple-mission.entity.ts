import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CoupleMission {
  @Field(() => Int)
  coupleMissionId: number;

  @Field(() => Int)
  coupleId: number;

  @Field(() => Int)
  missionId: number;

  @Field(() => Boolean)
  isCompleted: boolean;

  @Field(() => Int)
  reminderClickCount: number;

  @Field(() => Date)
  createdAt: Date;
}
