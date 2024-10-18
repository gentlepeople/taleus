import { EnumSubscriptionStatus } from '@gentlepeople/taleus-schema';
import { Inject, Injectable } from '@nestjs/common';
import { logger } from 'firebase-functions/v2';

import { WebhookSubscriptionPeriodType, WebhookSubscriptionStatusType } from '@/domain';
import {
  SyncSubscriptionStatusUsecase,
  IUserRepository,
  USER_REPOSITORY,
  ANALYTICS_PORT,
  AnalyticsPort,
} from '@/ports';

const FAILED_MESSAGE = 'Webhook received, but processing failed.';

@Injectable()
export class SyncSubscriptionStatusService implements SyncSubscriptionStatusUsecase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(ANALYTICS_PORT)
    private readonly analyticsPort: AnalyticsPort,
  ) {}

  async execute(event: {
    id: string;
    appUserId: string;
    type: WebhookSubscriptionStatusType;
    periodType: WebhookSubscriptionPeriodType;
  }): Promise<{ success: boolean; message: string }> {
    const { id, appUserId, type, periodType } = event;

    try {
      switch (type) {
        case 'INITIAL_PURCHASE':
        case 'NON_RENEWING_PURCHASE':
        case 'RENEWAL':
        case 'UNCANCELLATION':
        case 'TEMPORARY_ENTITLEMENT_GRANT':
        case 'TRANSFER': {
          const status =
            periodType === 'TRIAL'
              ? EnumSubscriptionStatus.ACTIVE_TRIAL
              : EnumSubscriptionStatus.ACTIVE;

          return await this.updateStatus(appUserId, status, 'Subscription activated.');
        }
        case 'CANCELLATION': {
          return await this.updateStatus(
            appUserId,
            EnumSubscriptionStatus.CANCELED,
            'Subscription canceled.',
          );
        }
        case 'BILLING_ISSUE':
        case 'SUBSCRIPTION_PAUSED': {
          const message =
            type === 'BILLING_ISSUE'
              ? '[Billing Issue] Subscription paused.'
              : 'Subscription paused.';
          return await this.updateStatus(appUserId, EnumSubscriptionStatus.PAUSED, message);
        }
        case 'EXPIRATION': {
          return await this.updateStatus(
            appUserId,
            EnumSubscriptionStatus.EXPIRED,
            'Subscription expired.',
          );
        }
        case 'TEST':
        case 'PRODUCT_CHANGE':
        case 'SUBSCRIPTION_EXTENDED': {
          return {
            success: true,
            message: `No action is required. Subscription type: ${type}.`,
          };
        }
        default:
          return {
            success: false,
            message: FAILED_MESSAGE,
          };
      }
    } catch (e) {
      logger.error(
        `Error SyncSubscriptionStatusService with eventId ${id} user_id ${appUserId} type ${type}: ${e}`,
      );
      return {
        success: false,
        message: FAILED_MESSAGE,
      };
    }
  }

  private async updateStatus(
    userId: string,
    status: EnumSubscriptionStatus,
    successMessage: string,
  ): Promise<{ success: boolean; message: string }> {
    const success = await this.userRepository.updateSubscriptionStatus(userId, status);
    //TODO: move to database trigger event
    this.analyticsPort.setProfileProperties({
      distinctId: userId,
      properties: {
        subscription_status: status,
      },
    });
    return {
      success,
      message: success ? successMessage : FAILED_MESSAGE,
    };
  }
}
