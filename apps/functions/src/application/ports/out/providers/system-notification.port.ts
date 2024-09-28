import { ISystemNotificationType } from '@/providers';

export const SYSTEM_NOTIFICATION_PORT = Symbol('SYSTEM_NOTIFICATION_PORT');

export interface SystemNotificationPort {
  send({ target, content }: ISystemNotificationType): Promise<void>;
}
