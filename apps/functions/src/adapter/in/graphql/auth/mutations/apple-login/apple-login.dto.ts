import { ObjectType, Field, ArgsType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@ArgsType()
export class AppleLoginRequest {
  @Field(() => String, {
    description: 'Authentication id token value. (for Apple)',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  idToken: string;

  @Field(() => String, {
    description:
      'If you want to check nonce claim, provide a string value here. It is used on Open ID for the ID Tokens.',
    nullable: true,
    defaultValue: null,
  })
  @IsOptional()
  @IsString()
  nonce?: string | null;
}

@ObjectType()
export class AppleLoginResponse {
  @Field(() => String)
  userId: string;

  @Field(() => String, {
    description: 'Custom token of firebase authentication user.(only if success)',
  })
  customToken: string;
}
