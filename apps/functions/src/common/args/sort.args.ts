import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsDefined, IsOptional, IsString } from 'class-validator';

@ArgsType()
export class SortArgs {
  @Field(() => String, {
    nullable: true,
    defaultValue: null,
    description: 'Sort the underlying list by the given key.',
  })
  @IsOptional()
  @IsString()
  sortKey: string | null;

  @Field(() => Boolean, {
    nullable: true,
    defaultValue: false,
    description: 'Reverse the order of the underlying list.',
  })
  @IsDefined()
  @IsBoolean()
  reverse: boolean;
}
