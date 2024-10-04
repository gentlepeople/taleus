import { EnumMissionCategory } from '@gentlepeople/taleus-codegen';

export type IAnswer = {
  questionId: number;
  questionOrder: number;
  questionTitle: string;
  partnerAnswer: string;
  userAnswer: string;
};

export type IAnswers = IAnswer[];

export type IFeed = {
  missionId: number;
  coupleMissionId: number;
  category: EnumMissionCategory;
  answers: IAnswers;
  formattedDate: string;
};

export type IFeedList = IFeed[];

export type ISelectRecordMixpanelEventParams = {
  missionId: number;
  questionIds: number[];
  questionOrders: number[];
  category: EnumMissionCategory;
  formattedDate: string;
};
