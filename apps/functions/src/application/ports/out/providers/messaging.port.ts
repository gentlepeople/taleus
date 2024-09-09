import { EnumPushNotificationTemplate } from '@/providers';

export const MESSAGING_PORT = Symbol('MESSAGING_PORT');

export interface MessagingPort {
  sendPushNotification(
    userIds: string[],
    templateType: EnumPushNotificationTemplate,
    args: { [key: string]: string | number },
  ): Promise<void>;
}
