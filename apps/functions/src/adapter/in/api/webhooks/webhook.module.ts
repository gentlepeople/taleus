import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { WebhookSubscriptionsController } from './subscriptions';

import { SubscriptionServiceModule } from '@/services/subscription';

@Module({
  imports: [HttpModule, SubscriptionServiceModule],
  controllers: [WebhookSubscriptionsController],
})
export class WebhookModule {}
