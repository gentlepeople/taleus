import { Field, ArgsType, Int } from '@nestjs/graphql';
import { IsDefined, IsNumber } from 'class-validator';

@ArgsType()
export class CoupleRequest {
  @Field(() => Int)
  @IsDefined()
  @IsNumber()
  coupleId: number;
}
