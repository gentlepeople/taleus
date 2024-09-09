import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Response {
  @Field(() => Int)
  responseId: number;

  @Field(() => Int)
  questionId: number;

  @Field(() => Int, { nullable: true })
  coupleMissionId?: number;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  content: string;

  @Field(() => Date)
  createdAt: Date;
}
