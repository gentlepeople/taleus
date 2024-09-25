import { WebhookSubscriptionPeriodType, WebhookSubscriptionStatusType } from '@/domain';

export class WebhookSubscriptionsEvent {
  id: string;
  type: WebhookSubscriptionStatusType;
  app_id: string;
  event_timestamp_ms: number;
  app_user_id: string;
  original_app_user_id: string;
  aliases: string[];
  commission_percentage?: number;
  country_code?: string;
  currency?: string;
  entitlement_id?: string;
  entitlement_ids?: string[];
  environment?: 'SANDBOX' | 'PRODUCTION';
  expiration_at_ms?: number;
  is_family_share?: boolean;
  offer_code?: string;
  original_transaction_id?: string;
  period_type?: WebhookSubscriptionPeriodType;
  presented_offering_id?: string;
  price?: number;
  price_in_purchased_currency?: number;
  product_id?: string;
  purchased_at_ms?: number;
  store?: 'AMAZON' | 'APP_STORE' | 'MAC_APP_STORE' | 'PLAY_STORE' | 'PROMOTIONAL' | 'STRIPE';
  subscriber_attributes?: object;
  takehome_percentage?: number;
  tax_percentage?: number;
  transaction_id?: string;
  grace_period_expiration_at_ms?: number;
  auto_resume_at_ms?: number;
  is_trial_conversion?: boolean;
  cancel_reason?:
    | 'UNSUBSCRIBE'
    | 'BILLING_ERROR'
    | 'DEVELOPER_INITIATED'
    | 'PRICE_INCREASE'
    | 'CUSTOMER_SUPPORT'
    | 'UNKNOWN';
  expiration_reason?:
    | 'UNSUBSCRIBE'
    | 'BILLING_ERROR'
    | 'DEVELOPER_INITIATED'
    | 'PRICE_INCREASE'
    | 'CUSTOMER_SUPPORT'
    | 'UNKNOWN';
  new_product_id?: string;
}

export class WebhookSubscriptionsDto {
  api_version: string;
  event: WebhookSubscriptionsEvent;
}

export class WebhookSubscriptionsResponse {
  success: boolean;
  message: string;
}
