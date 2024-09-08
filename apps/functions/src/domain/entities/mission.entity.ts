import { EnumMissionCategory } from '@gentlepeople/taleus-schema';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Mission {
  @Field(() => Int)
  missionId: number;

  @Field(() => String)
  title: string;

  @Field(() => EnumMissionCategory)
  category: EnumMissionCategory;
}
