export type IQuestion = {
  questionId: number;
  questionOrder: number;
  question: string;
};

export type IQuestions = IQuestion[];

export type IUserAnswer = {
  questionId: number;
  content: string;
};

export type IUserAnswers = IUserAnswer[];

export type ISetAnswerByQuestionParams = {
  answer: string;
  questionId: number;
};

export type IOnboardingUserModalParams = {
  onPressOkay: () => void;
};

export type ISubmitAnswersParams = {
  answers: IUserAnswers;
  missionId: number;
  coupleMissionId?: number;
  onCompleted: () => void;
};

export type IReminderParams = {
  openPreventModal: (title: string) => void;
};

export type IViewPartnerAnswerMixpanelEventParams = {
  missionId: number;
  questions: IQuestions;
};
