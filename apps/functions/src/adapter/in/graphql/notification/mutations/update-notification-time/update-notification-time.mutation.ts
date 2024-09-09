import { Inject } from '@nestjs/common';
import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';

import {
  UpdateNotificationTimeRequest,
  UpdateNotificationTimeResponse,
} from './update-notification-time.dto';

import { Auth, checkUserPermission, GqlContext } from '@/common';
import {
  FIND_USER_USECASE,
  FindUserUsecase,
  TIME_PORT,
  TimePort,
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
    @Inject(TIME_PORT)
    private readonly timePort: TimePort,
  ) {}

  @Mutation(() => UpdateNotificationTimeResponse)
  @Auth()
  async updateNotificationTime(
    @Args() args: UpdateNotificationTimeRequest,
    @Context() context: GqlContext,
  ): Promise<UpdateNotificationTimeResponse> {
    const { userId, notificationTime } = args;
    checkUserPermission(context, userId);

    const notificationDateTime = this.timePort.get(`2000-01-01T${notificationTime}:00Z`);

    await this.updateNotificationTimeUsecase.execute(userId, notificationDateTime);
    const findUser = await this.findUserUsecase.findOneByUserId(userId);

    return { user: findUser };
  }
}
