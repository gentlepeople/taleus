import { useCallback, useMemo } from 'react';
import { useEffectOnceWhen } from 'rooks';
import { LAST_PROGRESS } from '../primary-home.const';
import {
  usePrimary_HomeAnswerInputManager,
  usePrimary_HomeKeyboardManager,
  usePrimary_HomeOnboardingQuestionData,
  usePrimary_HomeOnboardingUserAnswer,
  usePrimary_HomeOpenModal,
  usePrimary_HomeProgress,
  usePrimary_HomeSubmitMission,
  usePrimary_HomeTodayMission,
} from './hooks';

type IPrimary_HomeControllerInput = void;
type IPrimary_HomeControllerOutput = {
  isLoading: boolean;
  isWritable: boolean;
  progress: number;
  question: string;
  questionId: number;
  currentValue: string;
  currentUserAnswer: string;
  isCTADisabled: boolean;
  isLastQuestion: boolean;
  setAnswer: (answer: string) => void;
  pressCTA: () => Promise<void>;
};

export const usePrimary_HomeController: Controller<
  IPrimary_HomeControllerInput,
  IPrimary_HomeControllerOutput
> = () => {
  const { savedOnboardingData, saveOnboardingUserAnswer } = usePrimary_HomeOnboardingUserAnswer();
  const { isOnboardingQuestionLoading, isOnboarindgUserWritable, onboardingQuestions } =
    usePrimary_HomeOnboardingQuestionData();
  const { isTodayMissionLoading, isTodayWritable, todayMissionId, todayQuestions, todayAnswers } =
    usePrimary_HomeTodayMission();
  const { submitAnswers } = usePrimary_HomeSubmitMission();
  const { progress, incrementProgress, resetProgress } = usePrimary_HomeProgress();
  const { userAnswer, setQuestionIds, setAnswerByQuestion } = usePrimary_HomeAnswerInputManager({
    savedOnboardingData,
    todayMissionId,
  });
  const { hideKeyboard } = usePrimary_HomeKeyboardManager();
  const { openOnboardingUserModal } = usePrimary_HomeOpenModal();

  const questions = useMemo(() => {
    if (isOnboarindgUserWritable) {
      return onboardingQuestions;
    }

    return todayQuestions;
  }, [isOnboarindgUserWritable, onboardingQuestions, todayQuestions]);

  const currentQuestion = useMemo(() => {
    if (!!questions) {
      return questions[progress - 1];
    }
  }, [progress, questions]);

  const question = useMemo(() => {
    if (!!currentQuestion) {
      return currentQuestion.question;
    }
  }, [currentQuestion]);

  const questionId = useMemo(() => {
    if (!!currentQuestion) {
      return currentQuestion.questionId;
    }
  }, [currentQuestion]);

  const currentValue = useMemo(() => {
    return userAnswer[progress - 1].content;
  }, [userAnswer, progress]);

  const currentUserAnswer = useMemo(() => {
    return todayAnswers[progress - 1].content;
  }, [todayAnswers, progress]);

  const setAnswer = useCallback(
    (answer: string) => {
      if (!!questionId) {
        setAnswerByQuestion(questionId)(answer);
      }
    },
    [setAnswerByQuestion, questionId],
  );

  const pressCTA = useCallback(async () => {
    hideKeyboard();

    if (progress < LAST_PROGRESS) {
      incrementProgress();
    }

    const isLastQuestion = progress === LAST_PROGRESS;
    if (isLastQuestion && isOnboarindgUserWritable) {
      openOnboardingUserModal({
        onPressOkay: () => {
          saveOnboardingUserAnswer(userAnswer);
        },
      });
    }

    if (isLastQuestion) {
      await submitAnswers({ answers: userAnswer, onCompleted: resetProgress });
    }
  }, [
    userAnswer,
    progress,
    incrementProgress,
    hideKeyboard,
    saveOnboardingUserAnswer,
    resetProgress,
    submitAnswers,
  ]);

  const isLoading = isOnboardingQuestionLoading || isTodayMissionLoading;
  const isWritable = isOnboarindgUserWritable || isTodayWritable;

  const isCTADisabled = useMemo(() => {
    if (isWritable) {
      return currentValue.length === 0;
    }
  }, [isWritable, currentValue]);

  const isLastQuestion = useMemo(() => {
    return progress === LAST_PROGRESS;
  }, [progress]);

  useEffectOnceWhen(() => {
    setQuestionIds(questions);
  }, !!questions);

  return {
    isLoading,
    isWritable,
    progress,
    question,
    questionId,
    currentValue,
    currentUserAnswer,
    isCTADisabled,
    isLastQuestion,
    setAnswer,
    pressCTA,
  };
};
