import { EnumResponseType } from '@gentlepeople/taleus-schema';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Question {
  @Field(() => Int)
  questionId: number;

  @Field(() => Int)
  questionOrder: number;

  @Field(() => EnumResponseType)
  responseType: EnumResponseType;

  @Field(() => String)
  content: string;
}
