import { Field, ArgsType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString, IsOptional } from 'class-validator';

import { PaginationArgs } from '@/common';
import { Mission, Question, Response } from '@/domain';

@ArgsType()
export class MissionLogRequest extends PaginationArgs {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  userId: string;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  @IsOptional()
  @IsBoolean()
  shuffle: boolean | null;
}

@ObjectType()
export class MissionLogQuestionData {
  @Field(() => Question)
  question: Question;

  @Field(() => Response)
  userResponse: Response;

  @Field(() => Response)
  partnerResponse: Response;
}

@ObjectType()
export class MissionLogMissionData {
  @Field(() => Mission)
  mission: Mission;

  @Field(() => [MissionLogQuestionData])
  data: MissionLogQuestionData[];
}

@ObjectType()
export class MissionLogResponse {
  @Field(() => [MissionLogMissionData])
  data: MissionLogMissionData[];
}
