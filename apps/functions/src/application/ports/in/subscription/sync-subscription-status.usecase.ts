import { WebhookSubscriptionPeriodType, WebhookSubscriptionStatusType } from '@/domain';

export const SYNC_SUBSCRIPTION_STATUS_USECASE = Symbol('SYNC_SUBSCRIPTION_STATUS_USECASE');

export interface SyncSubscriptionStatusUsecase {
  execute(event: {
    id: string;
    appUserId: string;
    type: WebhookSubscriptionStatusType;
    periodType: WebhookSubscriptionPeriodType;
  }): Promise<{ success: boolean; message: string }>;
}
