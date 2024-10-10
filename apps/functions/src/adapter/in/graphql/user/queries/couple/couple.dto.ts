import { Field, ArgsType } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';
import { GraphQLBigInt } from 'graphql-scalars';

import { IsBigInt } from '@/common';

@ArgsType()
export class CoupleRequest {
  @Field(() => GraphQLBigInt)
  @IsDefined()
  @IsBigInt()
  coupleId: bigint;
}
