import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class DailyMissionResponse {
  @Field(() => Int)
  count: number;
}
