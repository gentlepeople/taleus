import { Field, ArgsType, Int } from '@nestjs/graphql';
import { IsDefined, IsNumber } from 'class-validator';

@ArgsType()
export class MissionRequest {
  @Field(() => Int)
  @IsDefined()
  @IsNumber()
  missionId: number;
}
