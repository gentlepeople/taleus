import { EnumMissionCategory } from '@gentlepeople/taleus-codegen';

export type IAnswer = {
  questionId: number;
  questionOrder: number;
  questionTitle: string;
  partnerAnswer: string;
  userAnswer: string;
  userResponseId: number;
};

export type IAnswers = IAnswer[];

export type IUpdateUserResponseParams = {
  responseId: number;
  newContent: string;
};

export type IOpenCheckEditModalParams = {
  onCancel: () => void;
  onComplete: () => Promise<void>;
};

export type IViewAnswerMixpanelEventParams = {
  missionId: number;
  questionId: number;
  questionOrder: number;
  category: EnumMissionCategory;
  formattedDate: Date;
};
