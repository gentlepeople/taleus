import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class EventDailyMissionResponse {
  @Field(() => Int)
  count: number;
}
