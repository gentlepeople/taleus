import { Inject, Injectable } from '@nestjs/common';
import isNull from 'lodash/isNull';

import {
  IUserRepository,
  PUSH_NOTIFICATION_PORT,
  PushNotificationPort,
  UpdateNotificationTimeUsecase,
  USER_REPOSITORY,
} from '@/ports';
import { EnumPushNotificationTemplate } from '@/providers';

@Injectable()
export class UpdateNotificationTimeService implements UpdateNotificationTimeUsecase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(PUSH_NOTIFICATION_PORT)
    private readonly pushNotificationPort: PushNotificationPort,
  ) {}

  async execute(userId: string, notificationTime: string): Promise<void> {
    const partner = await this.userRepository.findPartnerByUserId(userId);
    const isCouple = !isNull(partner);

    await this.userRepository.updateNotificationTime(userId, notificationTime);

    if (isCouple) {
      const { userId: partnerId } = partner;
      await this.userRepository.updateNotificationTime(partnerId, notificationTime);
      const { nickname: userNickname } = await this.userRepository.findOneByUserId(userId);
      await this.pushNotificationPort.send(
        [partnerId],
        EnumPushNotificationTemplate.UPDATE_PARTNER_NOTIFICATION_TIME_ALARM,
        { nickname: userNickname },
      );
    }
  }
}
