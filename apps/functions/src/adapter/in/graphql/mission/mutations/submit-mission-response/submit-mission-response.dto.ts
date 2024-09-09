import { ObjectType, Field, ArgsType, InputType, Int } from '@nestjs/graphql';
import { IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class SubmitMissionResponseRequestData {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  userId: string;

  @Field(() => Int)
  @IsDefined()
  @IsNumber()
  questionId: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  coupleMissionId?: number;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  content: string;
}

@ArgsType()
export class SubmitMissionResponseRequest {
  @Field(() => [SubmitMissionResponseRequestData])
  data: SubmitMissionResponseRequestData[];
}

@ObjectType()
export class SubmitMissionResponseResponse {
  @Field(() => Boolean)
  success: boolean;
}
