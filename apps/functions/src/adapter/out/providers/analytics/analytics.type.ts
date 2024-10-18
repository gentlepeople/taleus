import { EnumSubscriptionStatus } from '@gentlepeople/taleus-schema';
import { Merge } from 'type-fest';

export enum EnumAnalyticsEventType {
  'signup_complete' = 'signup_complete',
  'connect_couple_complete' = 'connect_couple_complete',
  'setup_couple_notification_time' = 'setup_couple_notification_time',
  'update_couple_notification_time' = 'update_couple_notification_time',
  'submit_first_answer' = 'submit_first_answer',
  'submit_second_answer' = 'submit_second_answer',
  'submit_third_answer' = 'submit_third_answer',
  'start_free_trial' = 'start_free_trial',
  'update_answer' = 'update_answer',
}

export type IAnalyticsEvent = Merge<
  | IAnalyticsSignUpCompleted
  | IAnalyticsConnectCoupleComplete
  | IAnalyticsSetupCoupleNotificationTime
  | IAnalyticsUpdateCoupleNotificationTime
  | IAnalyticsSubmitAnswer
  | IAnalyticsStartFreeTrial
  | IAnalyticsUpdateAnswer,
  { distinct_id: string }
>;

type IAnalyticsSignUpCompleted = {
  type: EnumAnalyticsEventType.signup_complete;
  properties: {
    user_id: string;
    nickname: string;
    gender: string;
    birthday: string;
    anniversary: string;
    signup_date: Date;
    couple_code: string;
  };
};

type IAnalyticsConnectCoupleComplete = {
  type: EnumAnalyticsEventType.connect_couple_complete;
  properties: {
    connect_status: boolean;
  };
};

type IAnalyticsSetupCoupleNotificationTime = {
  type: EnumAnalyticsEventType.setup_couple_notification_time;
  properties: {
    notification_time: string;
  };
};

type IAnalyticsUpdateCoupleNotificationTime = {
  type: EnumAnalyticsEventType.update_couple_notification_time;
  properties: {
    notification_time: string;
  };
};

type IAnalyticsSubmitAnswer = {
  type:
    | EnumAnalyticsEventType.submit_first_answer
    | EnumAnalyticsEventType.submit_second_answer
    | EnumAnalyticsEventType.submit_third_answer;
  properties: {
    couple_question_id: number;
    question_id: number;
    question_subid: number;
    question_category: string;
    submit_date: Date;
  };
};

type IAnalyticsStartFreeTrial = {
  type: EnumAnalyticsEventType.start_free_trial;
  properties: {
    plan_option: string;
    trial_period: number;
    price: number;
    currency: 'KRW';
    start_date: Date;
  };
};

type IAnalyticsUpdateAnswer = {
  type: EnumAnalyticsEventType.update_answer;
  properties: {
    couple_question_id: number;
    question_id: number;
    question_subid: number;
    question_category: string;
    submit_date: Date;
  };
};

export enum EAnalyticsPeopleProperty {
  'user_id' = 'user_id',
  'nickname' = 'nickname',
  'gender' = 'gender',
  'birthday' = 'birthday',
  'anniversary' = 'anniversary',
  'signup_date' = 'signup_date',
  'connect_status' = 'connect_status',
  'couple_code' = 'couple_code',
  'notification_time' = 'notification_time',
  'tale_count' = 'tale_count',
  'subscription_status' = 'subscription_status',
  'withdrawal_date' = 'withdrawal_date',
}

export type IAnalyticsPeopleIncrement = {
  distinctId: string;
  propertyName: string;
  incrementBy: number;
};

export type IAnalyticsPeopleSet = Partial<{
  [EAnalyticsPeopleProperty.user_id]: string;
  [EAnalyticsPeopleProperty.nickname]: string;
  [EAnalyticsPeopleProperty.gender]: string;
  [EAnalyticsPeopleProperty.birthday]: string; // YYYY-MM-DD
  [EAnalyticsPeopleProperty.anniversary]: string; // YYYY-MM-DD
  [EAnalyticsPeopleProperty.signup_date]: Date;
  [EAnalyticsPeopleProperty.connect_status]: boolean;
  [EAnalyticsPeopleProperty.couple_code]: string;
  [EAnalyticsPeopleProperty.notification_time]: string; //HH:mm
  [EAnalyticsPeopleProperty.tale_count]: number;
  [EAnalyticsPeopleProperty.subscription_status]: EnumSubscriptionStatus;
  [EAnalyticsPeopleProperty.withdrawal_date]?: Date | undefined;
}>;
