import { ObjectType, Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

import { Mission, Response } from '@/domain';

@ArgsType()
export class TodayCoupleMissionRequest {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  userId: string;
}

@ObjectType()
export class TodayCoupleMissionStatus {
  @Field(() => Boolean)
  isCompleted: boolean;

  @Field(() => [Response])
  responses: Response[];
}

@ObjectType()
export class TodayCoupleMissionResponse {
  @Field(() => Mission)
  mission: Mission;

  @Field(() => Boolean)
  coupleCompleted: boolean;

  @Field(() => TodayCoupleMissionStatus)
  userStatus: TodayCoupleMissionStatus;

  @Field(() => TodayCoupleMissionStatus)
  partnerStatus: TodayCoupleMissionStatus;
}
