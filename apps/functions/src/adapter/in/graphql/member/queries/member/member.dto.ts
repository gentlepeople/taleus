import { Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@ArgsType()
export class MemberRequest {
  @Field(() => Number)
  @IsNotEmpty()
  @IsNumber()
  memberId: number;
}
