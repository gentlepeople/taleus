export const MISSION_REMINDER_REPOSITORY = Symbol('MISSION_REMINDER_REPOSITORY');

export interface IMissionReminderRepository {
  findLatestDateByCoupleMissionId(coupleMissionId: bigint): Promise<Date | null>;
  createOneAndIncrementCount(data: {
    coupleMissionId: bigint;
    senderId: string;
    receiverId: string;
    reminderTime: Date;
  }): Promise<boolean>;
}
