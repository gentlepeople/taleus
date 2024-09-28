import { useCallback, useMemo } from 'react';
import { PanGesture } from 'react-native-gesture-handler';
import { useEffectOnceWhen } from 'rooks';
import { EDirection } from '~/mobile-ui';
import { LAST_PROGRESS } from '../primary-home.const';
import {
  usePrimary_HomeAnimationKey,
  usePrimary_HomeAnswerInputManager,
  usePrimary_HomeGestureHandler,
  usePrimary_HomeKeyboardManager,
  usePrimary_HomeNavigation,
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
  showBanner: boolean;
  shouldConnect: boolean;
  hasNoMyReply: boolean;
  hasNoPartnerReply: boolean;
  direction: EDirection;
  animationKeyIndex: string;
  panGesture: PanGesture;
  setAnswer: (answer: string) => void;
  pressCTA: () => Promise<void>;
  pressBannerButton: () => Promise<void>;
};

export const usePrimary_HomeController: Controller<
  IPrimary_HomeControllerInput,
  IPrimary_HomeControllerOutput
> = () => {
  const { savedOnboardingData, saveOnboardingUserAnswer } = usePrimary_HomeOnboardingUserAnswer();
  const { isOnboardingQuestionLoading, isOnboarindgUserWritable, onboardingQuestions } =
    usePrimary_HomeOnboardingQuestionData();
  const {
    isTodayMissionLoading,
    isTodayWritable,
    todayMissionId,
    todayQuestions,
    todayAnswers,
    isCoupled,
    todayAnswersCompleted,
    partnerTodayAnswersCompleted,
  } = usePrimary_HomeTodayMission();
  const { submitAnswers } = usePrimary_HomeSubmitMission();
  const { progress, incrementProgress, decrementProgress, resetProgress } =
    usePrimary_HomeProgress();
  const { userAnswer, setQuestionIds, setAnswerByQuestion } = usePrimary_HomeAnswerInputManager({
    savedOnboardingData,
    todayMissionId,
  });
  const { hideKeyboard } = usePrimary_HomeKeyboardManager();
  const { openOnboardingUserModal } = usePrimary_HomeOpenModal();
  const { goConnectCouple } = usePrimary_HomeNavigation();

  const isLoading = isOnboardingQuestionLoading || isTodayMissionLoading;
  const isWritable = isOnboarindgUserWritable || isTodayWritable;

  const showBanner =
    !isOnboarindgUserWritable ||
    !(isCoupled && !todayAnswersCompleted && !partnerTodayAnswersCompleted) ||
    !(isCoupled && todayAnswersCompleted && partnerTodayAnswersCompleted);
  const shouldConnect = !isCoupled;
  const hasNoMyReply = isCoupled && !todayAnswersCompleted && partnerTodayAnswersCompleted;
  const hasNoPartnerReply = isCoupled && todayAnswersCompleted && !partnerTodayAnswersCompleted;

  const { direction, animationKeyIndex, nextQuestionAnimation, prevQuestionAnimation } =
    usePrimary_HomeAnimationKey();
  const { panGesture } = usePrimary_HomeGestureHandler({
    onLeftSwipe: () => {
      if (isWritable) {
        return;
      }

      if (progress === 3) {
        return;
      }

      nextQuestionAnimation();
      incrementProgress();
    },
    onRightSwipe: () => {
      if (progress === 1) {
        return;
      }

      prevQuestionAnimation();
      decrementProgress();
    },
  });

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
    if (!!userAnswer) {
      return userAnswer[progress - 1].content;
    }
  }, [userAnswer, progress]);

  const currentUserAnswer = useMemo(() => {
    if (!!todayAnswers) {
      return todayAnswers[progress - 1].content;
    }
  }, [todayAnswers, progress]);

  const isCTADisabled = useMemo(() => {
    if (isWritable) {
      return currentValue.length === 0;
    }
  }, [isWritable, currentValue]);

  const isLastQuestion = useMemo(() => {
    return progress === LAST_PROGRESS;
  }, [progress]);

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

    if (isLastQuestion && isOnboarindgUserWritable) {
      openOnboardingUserModal({
        onPressOkay: () => {
          saveOnboardingUserAnswer(userAnswer);
        },
      });
    }

    if (isLastQuestion) {
      await submitAnswers({
        answers: userAnswer,
        missionId: todayMissionId,
        onCompleted: resetProgress,
      });
    }
  }, [
    userAnswer,
    progress,
    isLastQuestion,
    incrementProgress,
    hideKeyboard,
    saveOnboardingUserAnswer,
    resetProgress,
    submitAnswers,
  ]);

  const pressBannerButton = useCallback(async () => {
    if (!isCoupled) {
      goConnectCouple();
      return;
    }

    if (hasNoPartnerReply) {
      await console.log('여기 독촉 함수');
    }
  }, [goConnectCouple, isCoupled, hasNoPartnerReply]);

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
    showBanner,
    shouldConnect,
    hasNoMyReply,
    hasNoPartnerReply,
    direction,
    animationKeyIndex,
    panGesture,
    setAnswer,
    pressCTA,
    pressBannerButton,
  };
};
