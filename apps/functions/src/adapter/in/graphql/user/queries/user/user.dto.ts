import { Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class UserRequest {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  userId: string;
}
