import { Mixpanel as OriginalMixpanel } from 'mixpanel-react-native';
import { ReactNode } from 'react';

export enum EAuthType {
  APPLE = 'Apple',
  GOOGLE = 'Google',
  KAKAO = 'Kakao',
}

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
  properties: {
    couple_code: string;
  };
};

type IMixpanelShareCoupleCode = {
  type: EMixpanelEventType.SHARE_COUPLE_CODE;
  properties: {
    couple_code: string;
  };
};

type IMixpanelRequestReminder = {
  type: EMixpanelEventType.REQUEST_REMINDER;
  properties: {
    mission_id: number;
  };
};

type IMixpanelViewPartnerAnswer = {
  type: EMixpanelEventType.VIEW_PATNER_ANSWER;
  properties: {
    mission_id: number;
    question_ids: number[];
    question_orders: number[];
  };
};

// 사용자가 paywall 팝업 조회 (마이 페이지 통해 접근하는 경우 제외)
type IMixpanelViewPaywall = {
  type: EMixpanelEventType.VIEW_PAYWALL;
  properties: {};
};

// 사용자가 paywall 팝업에서 X 버튼 클릭
type IMixpanelExitPaywall = {
  type: EMixpanelEventType.EXIT_PAYWALL;
  properties: {};
};

type IMixpanelSelectAppBar = {
  type: EMixpanelEventType.SELECT_APP_BAR;
  properties: {
    screen: string;
  };
};

// 피드 화면에서 특정 일자의 답변 컴포넌트 클릭
type IMixpanelSelectRecord = {
  type: EMixpanelEventType.SELECT_RECORD;
  properties: {
    mission_id: number;
    question_ids: number[];
    question_orders: number[];
    question_category: string;
    submit_date: Date;
  };
};

//과거 기록 스크린에서 첫 번째 답변 확인
type IMixpanelViewFirstAnswer = {
  type: EMixpanelEventType.VIEW_FIRST_ANSWER;
  properties: {
    mission_id: number;
    question_id: number;
    question_order: number;
    question_category: string;
    submit_date: Date;
  };
};

//과거 기록 스크린에서 두 번째 답변 확인
type IMixpanelViewSecondAnswer = {
  type: EMixpanelEventType.VIEW_SECOND_ANSWER;
  properties: {
    mission_id: number;
    question_id: number;
    question_order: number;
    question_category: string;
    submit_date: Date;
  };
};

//과거 기록 스크린에서 세 번째 답변 확인
type IMixpanelViewThirdAnswer = {
  type: EMixpanelEventType.VIEW_THIRD_ANSWER;
  properties: {
    mission_id: number;
    question_id: number;
    question_order: number;
    question_category: string;
    submit_date: Date;
  };
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
