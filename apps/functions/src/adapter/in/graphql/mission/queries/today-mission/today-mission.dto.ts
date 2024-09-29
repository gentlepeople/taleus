import { ObjectType, Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

import { CoupleMission, Mission, Response } from '@/domain';

@ArgsType()
export class TodayMissionRequest {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  userId: string;
}

@ObjectType()
export class TodayMissionResponseObject {
  @Field(() => Boolean)
  isCompleted: boolean;

  @Field(() => [Response])
  data: Response[];
}

@ObjectType()
export class TodayMissionResponse {
  @Field(() => Mission)
  mission: Mission;

  @Field(() => CoupleMission, { nullable: true })
  coupleMission: CoupleMission | null;

  @Field(() => TodayMissionResponseObject)
  userResponse: TodayMissionResponseObject;

  @Field(() => TodayMissionResponseObject, { nullable: true })
  partnerResponse: TodayMissionResponseObject | null;
}
