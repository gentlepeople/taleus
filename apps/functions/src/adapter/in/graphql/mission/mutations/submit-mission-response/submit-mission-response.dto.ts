import { ObjectType, Field, ArgsType, InputType } from '@nestjs/graphql';
import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { GraphQLBigInt } from 'graphql-scalars';

import { IsBigInt } from '@/common';

@InputType()
export class SubmitMissionResponseRequestData {
  @Field(() => GraphQLBigInt)
  @IsDefined()
  @IsBigInt()
  questionId: bigint;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  content: string;
}

@ArgsType()
export class SubmitMissionResponseRequest {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  userId: string;

  @Field(() => GraphQLBigInt)
  @IsNotEmpty()
  @IsBigInt()
  missionId: bigint;

  @Field(() => GraphQLBigInt, { nullable: true, defaultValue: null })
  @IsOptional()
  @IsBigInt()
  coupleMissionId?: bigint;

  @Field(() => [SubmitMissionResponseRequestData])
  data: SubmitMissionResponseRequestData[];
}

@ObjectType()
export class SubmitMissionResponseResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String, { nullable: true })
  message: string | null;
}
