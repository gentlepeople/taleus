import { ObjectType, Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class KakaoLoginRequest {
  @Field(() => String, {
    description: 'Authentication access token value. (for Kakao)',
  })
  @IsNotEmpty()
  @IsString()
  accessToken: string;
}

@ObjectType()
export class KakaoLoginResponse {
  @Field(() => String)
  userId: string;

  @Field(() => String, {
    description: 'Custom token of firebase authentication user.(only if success)',
  })
  customToken: string;
}
