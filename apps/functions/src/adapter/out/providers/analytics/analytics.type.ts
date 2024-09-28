import { Merge } from 'type-fest';

export enum EnumAnalyticsEventType {
  'CREATE_USER' = 'CREATE_USER',
}

export type IAnalyticsEvent = Merge<IAnalyticsCreateExerciseRecord, { distinct_id: string }>;

type IAnalyticsCreateExerciseRecord = {
  type: EnumAnalyticsEventType.CREATE_USER;
  properties: {
    createdAt: Date;
    recordDate: Date;
    exerciseDuration: number;
    exerciseTypes: string[];
    intensity: string;
  };
};

export enum EAnalyticsPeopleProperty {
  'POST_COUNT' = 'POST_COUNT',
  'nickname' = 'nickname',
  '$email' = '$email',
  '$phone' = '$phone',
  'yob' = 'yob',
  'sex' = 'sex',
  'education' = 'education',
  'organizationId' = 'organizationId',
  'PROGRAM_PURCHASE_COUNT' = 'PROGRAM_PURCHASE_COUNT',
  'USER_ID' = 'USER_ID',
}

export type IAnalyticsPeopleIncrement = {
  distinctId: string;
  propertyName: string;
  incrementBy: number;
};

export type IAnalyticsPeopleSet = Partial<{
  [EAnalyticsPeopleProperty.nickname]: string;
  [EAnalyticsPeopleProperty.$email]: string;
  [EAnalyticsPeopleProperty.$phone]: string;
  [EAnalyticsPeopleProperty.yob]?: number;
  [EAnalyticsPeopleProperty.sex]: string;
  [EAnalyticsPeopleProperty.education]: string;
  [EAnalyticsPeopleProperty.USER_ID]: string;
  [EAnalyticsPeopleProperty.organizationId]: number;
}>;
