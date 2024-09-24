import { ObjectType, Field, ArgsType, InputType } from '@nestjs/graphql';
import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { GraphQLBigInt } from 'graphql-scalars';

import { IsBigInt } from '@/common';

@InputType()
export class SubmitMissionResponseRequestData {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  userId: string;

  @Field(() => GraphQLBigInt)
  @IsDefined()
  @IsBigInt()
  questionId: bigint;

  @Field(() => GraphQLBigInt, { nullable: true })
  @IsOptional()
  @IsBigInt()
  coupleMissionId?: bigint;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  content: string;
}

@ArgsType()
export class SubmitMissionResponseRequest {
  @Field(() => [SubmitMissionResponseRequestData])
  data: SubmitMissionResponseRequestData[];
}

@ObjectType()
export class SubmitMissionResponseResponse {
  @Field(() => Boolean)
  success: boolean;
}
