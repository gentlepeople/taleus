import { EnumGender } from '@gentlepeople/taleus-schema';
import { ObjectType, Field, ArgsType, InputType } from '@nestjs/graphql';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

import { User } from '@/domain';

@InputType({
  description:
    'UpdateUserInputRequest allows you to update user details. All fields are optional; only provided fields will be updated.',
})
export class UpdateUserInputRequest {
  @Field(() => String, {
    nullable: true,
    defaultValue: null,
  })
  nickname: string | null;

  @Field(() => String, {
    nullable: true,
    defaultValue: null,
  })
  profileImageUrl: string | null;

  @Field(() => EnumGender, {
    nullable: true,
    defaultValue: null,
  })
  gender: EnumGender | null;

  @Field(() => Date, {
    nullable: true,
    defaultValue: null,
  })
  birthday: Date | null;

  @Field(() => Date, {
    nullable: true,
    defaultValue: null,
  })
  coupleStartDate: Date | null;
}

@ArgsType()
export class UpdateUserRequest {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  userId: string;

  @Field(() => UpdateUserInputRequest)
  @IsDefined()
  input: UpdateUserInputRequest;
}

@ObjectType()
export class UpdateUserResponse {
  @Field(() => User)
  user: User;
}
