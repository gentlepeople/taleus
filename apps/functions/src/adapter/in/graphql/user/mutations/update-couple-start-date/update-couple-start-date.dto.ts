import { ObjectType, Field, ArgsType } from '@nestjs/graphql';
import { IsDate, IsDefined } from 'class-validator';
import { GraphQLBigInt } from 'graphql-scalars';

import { IsBigInt } from '@/common';
import { Couple } from '@/domain';

@ArgsType()
export class UpdateCoupleStartDateRequest {
  @Field(() => GraphQLBigInt)
  @IsDefined()
  @IsBigInt()
  coupleId: bigint;

  @Field(() => Date)
  @IsDefined()
  @IsDate()
  coupleStartDate: Date;
}

@ObjectType()
export class UpdateCoupleStartDateResponse {
  @Field(() => Couple)
  couple: Couple;
}
