import { Field, ArgsType, ObjectType, Int } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString, IsOptional, IsDefined } from 'class-validator';
import { GraphQLBigInt } from 'graphql-scalars';

import { IsBigInt, PaginationArgs } from '@/common';
import { CoupleMission, Mission, Question, Response } from '@/domain';

@ArgsType()
export class CompletedCoupleMissionsRequest extends PaginationArgs {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  userId: string;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  @IsOptional()
  @IsBoolean()
  shuffle: boolean | null;
}

@ArgsType()
export class CompletedCoupleMissionRequest {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  userId: string;

  @Field(() => GraphQLBigInt)
  @IsDefined()
  @IsBigInt()
  coupleMissionId: bigint;
}

@ObjectType()
export class CompletedCoupleMissionData {
  @Field(() => Question)
  question: Question;

  @Field(() => Response)
  userResponse: Response;

  @Field(() => Response, { nullable: true })
  partnerResponse: Response | null;
}

@ObjectType()
export class CompletedCoupleMissionResponse {
  @Field(() => Mission)
  mission: Mission;

  @Field(() => CoupleMission)
  coupleMission: CoupleMission;

  @Field(() => [CompletedCoupleMissionData])
  data: CompletedCoupleMissionData[];
}

@ObjectType()
export class CompletedCoupleMissionsResponse {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [CompletedCoupleMissionResponse])
  data: CompletedCoupleMissionResponse[];
}
