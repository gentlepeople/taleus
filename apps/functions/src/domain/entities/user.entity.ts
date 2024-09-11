import { EnumGender, EnumOAuthProviderType } from '@gentlepeople/taleus-schema';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String)
  userId: string;

  @Field(() => Boolean)
  isAnonymous: boolean;

  @Field(() => String)
  nickname: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  profileImageUrl: string;

  @Field(() => EnumGender)
  gender: EnumGender;

  @Field(() => Date)
  birthday: Date;

  @Field(() => EnumOAuthProviderType)
  oauthProviderType: EnumOAuthProviderType;

  @Field(() => String)
  personalCode: string;

  @Field(() => String, { nullable: true })
  notificationTime?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
