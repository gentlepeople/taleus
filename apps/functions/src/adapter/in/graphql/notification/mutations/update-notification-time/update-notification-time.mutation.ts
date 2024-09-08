import { Inject } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';

import {
  UpdateNotificationTimeRequest,
  UpdateNotificationTimeResponse,
} from './update-notification-time.dto';

import { Auth } from '@/common';
import {
  FIND_USER_USECASE,
  FindUserUsecase,
  UPDATE_NOTIFICATION_TIME_USECASE,
  UpdateNotificationTimeUsecase,
} from '@/ports';

@Resolver()
export class UpdateNotificationTimeMutation {
  constructor(
    @Inject(UPDATE_NOTIFICATION_TIME_USECASE)
    private readonly updateNotificationTimeUsecase: UpdateNotificationTimeUsecase,
    @Inject(FIND_USER_USECASE)
    private readonly findUserUsecase: FindUserUsecase,
  ) {}

  @Mutation(() => UpdateNotificationTimeResponse)
  @Auth()
  async updateNotificationTime(
    @Args() args: UpdateNotificationTimeRequest,
  ): Promise<UpdateNotificationTimeResponse> {
    const { userId, notificationTime } = args;
    const notificationDateTime = new Date(`2000-01-01T${notificationTime}:00Z`);

    await this.updateNotificationTimeUsecase.execute(userId, notificationDateTime);
    const findUser = await this.findUserUsecase.findOneByUserId(userId);

    return { user: findUser };
  }
}
