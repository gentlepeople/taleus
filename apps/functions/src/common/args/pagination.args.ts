import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, {
    nullable: true,
    defaultValue: null,
    description: 'The number of items to retrieve per page.',
  })
  take: number | null;

  @Field(() => Int, {
    nullable: true,
    defaultValue: null,
    description: 'Determines how many items to skip before retrieving data.',
  })
  skip: number | null;
}
