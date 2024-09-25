export const SEND_MISSION_REMINDER_TO_PARTNER_USECASE = Symbol(
  'SEND_MISSION_REMINDER_TO_PARTNER_USECASE',
);

export interface SendMissionReminderToPartnerUsecase {
  execute(userId: string, coupleMissionId: bigint): Promise<{ success: boolean; message?: string }>;
}
