import { ObjectType, Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

import { Mission, Response } from '@/domain';

@ArgsType()
export class TodayMissionRequest {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  userId: string;
}

@ObjectType()
export class TodayMissionStatus {
  @Field(() => Boolean)
  isCompleted: boolean;

  @Field(() => [Response])
  responses: Response[];
}

@ObjectType()
export class TodayMissionResponse {
  @Field(() => Mission)
  mission: Mission;

  @Field(() => Boolean)
  coupleCompleted: boolean;

  @Field(() => TodayMissionStatus)
  userStatus: TodayMissionStatus;

  @Field(() => TodayMissionStatus)
  partnerStatus: TodayMissionStatus;
}
