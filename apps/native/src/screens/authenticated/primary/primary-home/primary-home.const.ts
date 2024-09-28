import { IUserAnswers } from './primary-home.type';

export const INITIAL_PROGRESS = 1;
export const LAST_PROGRESS = 3;

export const ONBOARDING_MISSION_ID = 1;

export const INITIAL_USER_ANSWER = [
  {
    questionId: null,
    content: '',
  },
  {
    questionId: null,
    content: '',
  },
  {
    questionId: null,
    content: '',
  },
] as IUserAnswers;
