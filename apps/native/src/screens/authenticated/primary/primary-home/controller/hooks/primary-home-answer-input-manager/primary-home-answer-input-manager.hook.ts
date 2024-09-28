import { useCallback, useState } from 'react';
import { useEffectOnceWhen } from 'rooks';
import { INITIAL_USER_ANSWER, ONBOARDING_MISSION_ID } from '../../../primary-home.const';
import { IQuestions, IUserAnswers } from '../../../primary-home.type';

type IPrimary_HomeAnswerInputManagerInput = {
  savedOnboardingData: IUserAnswers;
  todayMissionId: number;
};
type IPrimary_HomeAnswerInputManagerOutput = {
  userAnswer: IUserAnswers;
  setQuestionIds: (questions: IQuestions) => void;
  setAnswerByQuestion: (questionId: number) => (answer: string) => void;
};

export const usePrimary_HomeAnswerInputManager: Hook<
  IPrimary_HomeAnswerInputManagerInput,
  IPrimary_HomeAnswerInputManagerOutput
> = ({ savedOnboardingData, todayMissionId }) => {
  const [userAnswer, setUserAnswer] = useState<IUserAnswers>(INITIAL_USER_ANSWER);

  const setQuestionIds = useCallback(
    (questions: IQuestions) => {
      setUserAnswer((prev) => {
        return prev.map((answer, index) => {
          return {
            questionId: questions[index].questionId,
            content: answer.content,
          };
        });
      });
    },
    [setUserAnswer],
  );

  const setAnswerByQuestion = useCallback(
    (questionId: number) => (answer: string) => {
      setUserAnswer((prev) => {
        return prev.map((item) => {
          if (item.questionId === questionId) {
            return { ...item, content: answer };
          }

          return item;
        });
      });
    },
    [userAnswer, setUserAnswer],
  );

  const shouldUpdate = todayMissionId === ONBOARDING_MISSION_ID && savedOnboardingData;
  useEffectOnceWhen(() => {
    setUserAnswer(savedOnboardingData);
  }, !!shouldUpdate);

  return { userAnswer, setQuestionIds, setAnswerByQuestion };
};
