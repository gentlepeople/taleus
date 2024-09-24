import { Field, ArgsType } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';
import { GraphQLBigInt } from 'graphql-scalars';

import { IsBigInt } from '@/common';

@ArgsType()
export class MissionRequest {
  @Field(() => GraphQLBigInt)
  @IsDefined()
  @IsBigInt()
  missionId: bigint;
}
