import { ObjectType, Field, ArgsType } from '@nestjs/graphql';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { GraphQLBigInt } from 'graphql-scalars';

import { IsBigInt } from '@/common';
import { Response } from '@/domain';

@ArgsType()
export class UpdateResponseRequest {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  userId: string;

  @Field(() => GraphQLBigInt)
  @IsDefined()
  @IsBigInt()
  responseId: bigint;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  newContent: string;
}

@ObjectType()
export class UpdateResponseResponse {
  @Field(() => Response)
  response: Response;
}
