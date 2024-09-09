import { EnumMissionCategory, mission } from '@gentlepeople/taleus-schema';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import isNull from 'lodash/isNull';

@ObjectType()
export class Mission {
  @Field(() => Int)
  missionId: number;

  @Field(() => String)
  title: string;

  @Field(() => EnumMissionCategory)
  category: EnumMissionCategory;

  public static enumConvert(object: mission): Mission | null {
    if (isNull(object)) {
      return null;
    }

    const missionDTO = new Mission();
    missionDTO.missionId = object.missionId;
    missionDTO.title = object.title;
    missionDTO.category = object.category as EnumMissionCategory;

    return missionDTO;
  }
}
