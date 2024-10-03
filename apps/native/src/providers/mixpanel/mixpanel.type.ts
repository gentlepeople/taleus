import { Mixpanel as OriginalMixpanel } from 'mixpanel-react-native';
import { ReactNode } from 'react';

export type EAuthType = {
  APPLE: 'Apple';
  GOOGLE: 'Google';
  KAKAO: 'Kakao';
};

export interface IMixpanelContext {
  mixpanel: Mixpanel;
}

export type IMixpanelProviderProps = {
  children: ReactNode;
};

export enum EMixpanelEventType {
  'CLICK_LOGIN' = 'click_login',
  'CLICK_VIEW_MORE' = 'click_view_more',
  'CLICK_SIGNUP' = 'click_signup',
  'CLICK_CONNECT_COUPLE' = 'click_connect_couple',
  'COPY_COUPLE_CODE' = 'copy_couple_code',
  'SHARE_COUPLE_CODE' = 'share_couple_code',
  'REQUEST_REMINDER' = 'request_reminder',
  'VIEW_PATNER_ANSWER' = 'view_partner_answer',
  'VIEW_PAYWALL' = 'view_paywall',
  'EXIT_PAYWALL' = 'exit_paywall',
  'SELECT_APP_BAR' = 'select_app_bar',
  'SELECT_RECORD' = 'select_record',
  'VIEW_FIRST_ANSWER' = 'view_first_answer',
  'VIEW_SECOND_ANSWER' = 'view_second_answer',
  'VIEW_THIRD_ANSWER' = 'view_third_answer',
}

type IMixpanelEvent =
  | IMixpanelClickLogin
  | IMixpanelClickViewMore
  | IMixpanelClickSignup
  | IMixpanelClickConnectCouple
  | IMixpanelCopyCoupleCode
  | IMixpanelShareCoupleCode
  | IMixpanelRequestReminder
  | IMixpanelViewPartnerAnswer
  | IMixpanelViewPaywall
  | IMixpanelExitPaywall
  | IMixpanelSelectAppBar
  | IMixpanelSelectRecord
  | IMixpanelViewFirstAnswer
  | IMixpanelViewSecondAnswer
  | IMixpanelViewThirdAnswer;

type IMixpanelClickLogin = {
  type: EMixpanelEventType.CLICK_LOGIN;
  properties: {
    button_type: EAuthType;
  };
};

type IMixpanelClickViewMore = {
  type: EMixpanelEventType.CLICK_VIEW_MORE;
  properties: {};
};

type IMixpanelClickSignup = {
  type: EMixpanelEventType.CLICK_SIGNUP;
  properties: {};
};

type IMixpanelClickConnectCouple = {
  type: EMixpanelEventType.CLICK_CONNECT_COUPLE;
  properties: {};
};

type IMixpanelCopyCoupleCode = {
  type: EMixpanelEventType.COPY_COUPLE_CODE;
  properties: {};
};

type IMixpanelShareCoupleCode = {
  type: EMixpanelEventType.SHARE_COUPLE_CODE;
  properties: {};
};

type IMixpanelRequestReminder = {
  type: EMixpanelEventType.REQUEST_REMINDER;
  properties: {};
};

type IMixpanelViewPartnerAnswer = {
  type: EMixpanelEventType.VIEW_PATNER_ANSWER;
  properties: {};
};

type IMixpanelViewPaywall = {
  type: EMixpanelEventType.VIEW_PAYWALL;
  properties: {};
};

type IMixpanelExitPaywall = {
  type: EMixpanelEventType.EXIT_PAYWALL;
  properties: {};
};

type IMixpanelSelectAppBar = {
  type: EMixpanelEventType.SELECT_APP_BAR;
  properties: {};
};

type IMixpanelSelectRecord = {
  type: EMixpanelEventType.SELECT_RECORD;
  properties: {};
};

type IMixpanelViewFirstAnswer = {
  type: EMixpanelEventType.VIEW_FIRST_ANSWER;
  properties: {};
};

type IMixpanelViewSecondAnswer = {
  type: EMixpanelEventType.VIEW_SECOND_ANSWER;
  properties: {};
};

type IMixpanelViewThirdAnswer = {
  type: EMixpanelEventType.VIEW_THIRD_ANSWER;
  properties: {};
};

export class Mixpanel extends OriginalMixpanel {
  constructor(token: string) {
    super(token, true);
  }
  trackEvent = (event: IMixpanelEvent): void => {
    super.track(event.type, event.properties);
    return;
  };
}
