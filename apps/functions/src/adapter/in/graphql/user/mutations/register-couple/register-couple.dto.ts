import { ObjectType, Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class RegisterCoupleRequest {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  inviterId: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  inviteePersonalCode: string;
}

@ObjectType()
export class RegisterCoupleResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String, { nullable: true })
  code?: string;

  @Field(() => String, { nullable: true })
  message?: string;
}
