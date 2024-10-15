import { ObjectType, Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

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
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Time must be in the format HH:mm',
  })
  notificationTime: string;
}

@ObjectType()
export class UpdateNotificationTimeResponse {
  @Field(() => User)
  user: User;
}
