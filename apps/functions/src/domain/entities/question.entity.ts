import { EnumResponseType, question } from '@gentlepeople/taleus-schema';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import isNull from 'lodash/isNull';

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

  public static enumConvert(object: question): Question | null {
    if (isNull(object)) {
      return null;
    }

    const questionDTO = new Question();
    questionDTO.questionId = object.questionId;
    questionDTO.questionOrder = object.questionOrder;
    questionDTO.responseType = object.responseType as EnumResponseType;
    questionDTO.content = object.content;

    return questionDTO;
  }
}
