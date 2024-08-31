import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Couple {
  @Field(() => Int)
  coupleId: number;

  @Field(() => String)
  inviterId: string;

  @Field(() => String)
  inviteeId: string;

  @Field(() => Date, { nullable: true })
  startDate: Date | null;

  @Field(() => Date)
  createdAt: Date;
}
