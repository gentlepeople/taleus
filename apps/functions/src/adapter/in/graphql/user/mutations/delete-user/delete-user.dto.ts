import { ObjectType, Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class DeleteUserRequest {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  userId: string;
}

@ObjectType()
export class DeleteUserResponse {
  @Field(() => Boolean)
  success: boolean;
}
