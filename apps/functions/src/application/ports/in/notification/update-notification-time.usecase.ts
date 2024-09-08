export const UPDATE_NOTIFICATION_TIME_USECASE = Symbol('UPDATE_NOTIFICATION_TIME_USECASE');

export interface UpdateNotificationTimeUsecase {
  execute(userId: string, notificationTime: Date): Promise<void>;
}
