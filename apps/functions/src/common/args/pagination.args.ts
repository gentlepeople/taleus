import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, {
    nullable: true,
    defaultValue: 10,
    description: 'The number of items to retrieve per page. default value: 10.',
  })
  take: number | null;

  @Field(() => Int, {
    nullable: true,
    defaultValue: 0,
    description: 'Determines how many items to skip before retrieving data. default value: 0.',
  })
  skip: number | null;
}
