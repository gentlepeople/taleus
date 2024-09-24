import { Field, ArgsType } from '@nestjs/graphql';
import { IsDefined, IsNumber } from 'class-validator';
import { GraphQLBigInt } from 'graphql-scalars';

@ArgsType()
export class CoupleRequest {
  @Field(() => GraphQLBigInt)
  @IsDefined()
  @IsNumber()
  coupleId: bigint;
}
