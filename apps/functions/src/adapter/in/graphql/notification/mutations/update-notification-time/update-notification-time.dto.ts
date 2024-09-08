import { ObjectType, Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

import { User } from '@/domain';

@ArgsType()
export class UpdateNotificationTimeRequest {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  userId: string;

  @Field(() => String, {
    description: 'Notification time represented as formatted string, e.g., "08:00"',
  })
  @IsNotEmpty()
  @IsString()
  notificationTime: string;
}

@ObjectType()
export class UpdateNotificationTimeResponse {
  @Field(() => User)
  user: User;
}
