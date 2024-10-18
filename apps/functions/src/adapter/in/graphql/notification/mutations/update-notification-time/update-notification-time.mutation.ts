import { Inject } from '@nestjs/common';
import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';

import {
  UpdateNotificationTimeRequest,
  UpdateNotificationTimeResponse,
} from './update-notification-time.dto';

import { UserAuth, checkUserPermission, GqlContext } from '@/common';
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
  @UserAuth()
  async updateNotificationTime(
    @Args() args: UpdateNotificationTimeRequest,
    @Context() context: GqlContext,
  ): Promise<UpdateNotificationTimeResponse> {
    const { userId, notificationTime } = args;
    checkUserPermission(context, userId);

    await this.updateNotificationTimeUsecase.execute(userId, notificationTime);
    const findUser = await this.findUserUsecase.findOneByUserId(userId);

    return { user: findUser };
  }
}
