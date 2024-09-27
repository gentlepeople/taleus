import {
  EnumGender,
  EnumOAuthProviderType,
  EnumSubscriptionStatus,
} from '@gentlepeople/taleus-schema';
import { Field, ObjectType } from '@nestjs/graphql';
import isNull from 'lodash/isNull';

export type UserProps = {
  userId: string;
  nickname: string;
  email: string;
  profileImageUrl: string;
  gender: EnumGender;
  birthday: Date;
  oauthProviderType: EnumOAuthProviderType;
  personalCode: string;
  notificationTime?: string;
  subscriptionStatus: EnumSubscriptionStatus;
  isProfileCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};

@ObjectType()
export class User {
  @Field(() => String)
  readonly userId: string;

  @Field(() => String)
  readonly nickname: string;

  @Field(() => String)
  readonly email: string;

  @Field(() => String)
  readonly profileImageUrl: string;

  @Field(() => EnumGender)
  readonly gender: EnumGender;

  @Field(() => Date)
  readonly birthday: Date;

  @Field(() => EnumOAuthProviderType)
  readonly oauthProviderType: EnumOAuthProviderType;

  @Field(() => String)
  readonly personalCode: string;

  @Field(() => String, { nullable: true })
  readonly notificationTime?: string;

  @Field(() => EnumSubscriptionStatus)
  readonly subscriptionStatus: EnumSubscriptionStatus;

  @Field(() => Boolean)
  readonly isProfileCompleted: boolean;

  @Field(() => Date)
  readonly createdAt: Date;

  @Field(() => Date)
  readonly updatedAt: Date;

  @Field(() => Boolean)
  readonly isAnonymous: boolean;

  constructor(props: UserProps) {
    this.userId = props.userId;
    this.nickname = props.nickname;
    this.email = props.email;
    this.profileImageUrl = props.profileImageUrl;
    this.gender = props.gender;
    this.birthday = props.birthday;
    this.oauthProviderType = props.oauthProviderType;
    this.personalCode = props.personalCode;
    this.notificationTime = props.notificationTime;
    this.subscriptionStatus = props.subscriptionStatus;
    this.isProfileCompleted = props.isProfileCompleted;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.isAnonymous = !isNull(props.deletedAt);
  }

  @Field(() => Boolean)
  get isSubscriptionActive(): boolean {
    return (
      this.subscriptionStatus === EnumSubscriptionStatus.ACTIVE ||
      this.subscriptionStatus === EnumSubscriptionStatus.ACTIVE_TRIAL
    );
  }
}
