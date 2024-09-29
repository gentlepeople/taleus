export type IAnswer = {
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
