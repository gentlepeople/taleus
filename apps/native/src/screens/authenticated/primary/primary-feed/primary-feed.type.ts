import { EnumMissionCategory } from '@gentlepeople/taleus-codegen';

export type IAnswer = {
  questionTitle: string;
  partnerAnswer: string;
  userAnswer: string;
  formattedDate: string;
};

export type IAnswers = IAnswer[];

export type IFeed = {
  coupleMissionId: number;
  category: EnumMissionCategory;
  answers: IAnswers;
};

export type IFeedList = IFeed[];
