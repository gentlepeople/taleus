import { ObjectType, Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { GraphQLBigInt } from 'graphql-scalars';

import { IsBigInt } from '@/common';

@ArgsType()
export class RemindMissionPartnerRequest {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  userId: string;

  @Field(() => GraphQLBigInt)
  @IsNotEmpty()
  @IsBigInt()
  coupleMissionId: bigint;
}

@ObjectType()
export class RemindMissionPartnerResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String, { nullable: true })
  message?: string;
}
