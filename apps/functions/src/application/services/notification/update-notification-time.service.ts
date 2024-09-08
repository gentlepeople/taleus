import { Inject, Injectable } from '@nestjs/common';
import isNull from 'lodash/isNull';

import { IUserRepository, UpdateNotificationTimeUsecase, USER_REPOSITORY } from '@/ports';

@Injectable()
export class UpdateNotificationTimeService implements UpdateNotificationTimeUsecase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
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
    } else {
      await this.userRepository.updateNotificationTime(userId, notificationTime);
    }
  }
}
