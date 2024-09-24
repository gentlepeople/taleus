import { EnumPushNotificationTemplate } from '@/providers';

export const PUSH_NOTIFICATION_PORT = Symbol('PUSH_NOTIFICATION_PORT');

export interface PushNotificationPort {
  send(
    userIds: string[],
    templateType: EnumPushNotificationTemplate,
    args: { [key: string]: string | number },
  ): Promise<void>;
}
