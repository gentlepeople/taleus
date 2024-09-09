import { ObjectType, Field, ArgsType, Int } from '@nestjs/graphql';
import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { Response } from '@/domain';

@ArgsType()
export class UpdateResponseRequest {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  userId: string;

  @Field(() => Int)
  @IsDefined()
  @IsNumber()
  responseId: number;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  newContent: string;
}

@ObjectType()
export class UpdateResponseResponse {
  @Field(() => Response)
  response: Response;
}
