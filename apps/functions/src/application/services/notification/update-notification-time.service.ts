import { Inject, Injectable } from '@nestjs/common';
import isNull from 'lodash/isNull';

import { EnumPushNotificationTemplate } from '../../../adapter/out';

import {
  IUserRepository,
  PUSH_NOTIFICATION_PORT,
  PushNotificationPort,
  UpdateNotificationTimeUsecase,
  USER_REPOSITORY,
} from '@/ports';

@Injectable()
export class UpdateNotificationTimeService implements UpdateNotificationTimeUsecase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(PUSH_NOTIFICATION_PORT)
    private readonly pushNotificationPort: PushNotificationPort,
  ) {}

  async execute(userId: string, notificationTime: Date): Promise<void> {
    const partner = await this.userRepository.findPartnerByUserId(userId);
    const isCouple = !isNull(partner);
    if (isCouple) {
      const { userId: partnerId } = partner;
      await this.userRepository.updateNotificationTimeWithPartner(
        userId,
        partnerId,
        notificationTime,
      );
      const { nickname: userNickname } = await this.userRepository.findOneByUserId(userId);
      await this.pushNotificationPort.send(
        [partnerId],
        EnumPushNotificationTemplate.UPDATE_PARTNER_NOTIFICATION_TIME_ALARM,
        { nickname: userNickname },
      );
    } else {
      await this.userRepository.updateNotificationTime(userId, notificationTime);
    }
  }
}
