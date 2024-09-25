import { Inject, Injectable } from '@nestjs/common';
import isNull from 'lodash/isNull';

import {
  RESPONSE_REPOSITORY,
  SendMissionReminderToPartnerUsecase,
  IResponseRepository,
  COUPLE_MISSION_REPOSITORY,
  ICoupleMissionRepository,
  IUserRepository,
  USER_REPOSITORY,
  PUSH_NOTIFICATION_PORT,
  PushNotificationPort,
  IMissionReminderRepository,
  MISSION_REMINDER_REPOSITORY,
  TIME_PORT,
  TimePort,
} from '@/ports';
import { EnumPushNotificationTemplate } from '@/providers';

@Injectable()
export class SendMissionReminderToPartnerService implements SendMissionReminderToPartnerUsecase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(COUPLE_MISSION_REPOSITORY)
    private readonly coupleMissionRepository: ICoupleMissionRepository,
    @Inject(MISSION_REMINDER_REPOSITORY)
    private readonly missionReminderRepository: IMissionReminderRepository,
    @Inject(RESPONSE_REPOSITORY)
    private readonly responseRepository: IResponseRepository,
    @Inject(PUSH_NOTIFICATION_PORT)
    private readonly pushNotificationPort: PushNotificationPort,
    @Inject(TIME_PORT)
    private readonly timePort: TimePort,
  ) {}

  async execute(
    userId: string,
    coupleMissionId: bigint,
  ): Promise<{ success: boolean; message?: string }> {
    // 1. Error if not in a couple
    const findPartner = await this.userRepository.findPartnerByUserId(userId);
    const isNotCouple = isNull(findPartner);
    if (isNotCouple) {
      return { success: false, message: 'Not in a couple relationship.' };
    }

    // 2. Error if partner has left.
    const isPartnerDeleted = findPartner.isAnonymous;
    if (isPartnerDeleted) {
      return {
        success: false,
        message: 'The partner has left.',
      };
    }

    // 3. Error if user hasn't answered the question
    const checkUserAnswer = await this.responseRepository.checkAllUsersCompletedCoupleMission(
      coupleMissionId,
      [userId],
    );
    const hasNotUserAnswer = !checkUserAnswer;
    if (hasNotUserAnswer) {
      return {
        success: false,
        message: 'User must answer first.',
      };
    }

    // 4. Error if partner has already answered
    const findCoupleMission = await this.coupleMissionRepository.findOneByCoupleMissionId(
      coupleMissionId,
    );
    if (findCoupleMission.isCompleted) {
      return {
        success: false,
        message: 'Partner already answered',
      };
    }

    // 5. Error if user is not subscribed and has already sent a reminder
    const findUser = await this.userRepository.findOneByUserId(userId);
    const isUserNotSubscribedAndHasSentReminder =
      !findUser.isSubscriptionActive && findCoupleMission.reminderCount > 0;
    if (isUserNotSubscribedAndHasSentReminder) {
      return {
        success: false,
        message: 'Reminder already sent (non-subscriber)',
      };
    }

    // 6. Error if user is subscribed but tries to send another nudge within 10 minutes
    const TEN_MINUTES = 10;
    const latestCoupleMissionReminderTime =
      await this.missionReminderRepository.findLatestDateByCoupleMissionId(coupleMissionId);
    const isUserSubscribedAndHasSentReminderRecently =
      findUser.isSubscriptionActive &&
      latestCoupleMissionReminderTime &&
      this.timePort.dayjs().diff(this.timePort.dayjs(latestCoupleMissionReminderTime), 'minute') <
        TEN_MINUTES;
    if (isUserSubscribedAndHasSentReminderRecently) {
      return {
        success: false,
        message: 'Reminder sent too recently (subscriber)',
      };
    }

    // 7. Reminder is allowed
    await this.pushNotificationPort.send(
      [findPartner.userId],
      EnumPushNotificationTemplate.UPDATE_PARTNER_NOTIFICATION_TIME_ALARM,
      { nickname: findUser.nickname },
    );

    await this.missionReminderRepository.createOneAndIncrementCount({
      coupleMissionId,
      senderId: userId,
      receiverId: findPartner.userId,
      reminderTime: this.timePort.get(),
    });

    return { success: true };
  }
}
