import { ObjectType, Field, ArgsType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@ArgsType()
export class GoogleLoginRequest {
  @Field(() => String, {
    description: 'Authentication id token value. (for Google)',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  idToken: string;
}

@ObjectType()
export class GoogleLoginResponse {
  @Field(() => String)
  userId: string;

  @Field(() => String, {
    description: 'Custom token of firebase authentication user.(only if success)',
  })
  customToken: string;
}
