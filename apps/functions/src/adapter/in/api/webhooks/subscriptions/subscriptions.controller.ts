import { Inject, Post, Controller, Body, HttpCode, HttpStatus } from '@nestjs/common';

import { WebhookSubscriptionsDto, WebhookSubscriptionsResponse } from './subscriptions.dto';

import { ApiAuth, EnumApiAuthType } from '@/common';
import { SYNC_SUBSCRIPTION_STATUS_USECASE, SyncSubscriptionStatusUsecase } from '@/ports';

@Controller('webhooks')
export class WebhookSubscriptionsController {
  constructor(
    @Inject(SYNC_SUBSCRIPTION_STATUS_USECASE)
    private readonly syncSubscriptionStatusUsecase: SyncSubscriptionStatusUsecase,
  ) {}

  @Post('subscriptions')
  @ApiAuth(EnumApiAuthType.SUBSCRIPTION)
  @HttpCode(HttpStatus.OK)
  async receiveSubscriptionWebhook(
    @Body() body: WebhookSubscriptionsDto,
  ): Promise<WebhookSubscriptionsResponse> {
    const {
      event: { id, app_user_id, type, period_type },
    } = body;
    const { success, message } = await this.syncSubscriptionStatusUsecase.execute({
      id,
      type,
      appUserId: app_user_id,
      periodType: period_type,
    });
    return { success, message };
  }
}
