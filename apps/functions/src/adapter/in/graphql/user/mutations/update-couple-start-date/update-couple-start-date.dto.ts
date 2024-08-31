import { ObjectType, Field, ArgsType } from '@nestjs/graphql';
import { IsDate, IsDefined, IsNumber } from 'class-validator';

import { Couple } from '@/domain';

@ArgsType()
export class UpdateCoupleStartDateRequest {
  @Field(() => Number)
  @IsDefined()
  @IsNumber()
  coupleId: number;

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
