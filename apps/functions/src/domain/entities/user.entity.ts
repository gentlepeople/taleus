import { EnumGender, EnumOAuthProviderType } from '@gentlepeople/taleus-schema';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String)
  userId: string;

  @Field(() => EnumGender)
  gender: EnumGender;

  @Field(() => EnumOAuthProviderType)
  oauthProviderType: EnumOAuthProviderType;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
