import { useCallback, useMemo } from 'react';
import { PanGesture } from 'react-native-gesture-handler';
import { useEffectOnceWhen } from 'rooks';
import { EDirection } from '~/mobile-ui';
import { LAST_PROGRESS, ONBOARDING_MISSION_ID } from '../primary-home.const';
import {
  usePrimary_HomeAnimationKey,
  usePrimary_HomeAnswerInputManager,
  usePrimary_HomeDayReminderManager,
  usePrimary_HomeGestureHandler,
  usePrimary_HomeKeyboardManager,
  usePrimary_HomeMinutesReminderManager,
  usePrimary_HomeMissionReminder,
  usePrimary_HomeMixpanel,
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
  currentValue: string;
  currentUserAnswer: string;
  currentPartnerAnswer: string;
  nickname: string;
  partnerNickname: string;
  isCTADisabled: boolean;
  isLastQuestion: boolean;
  showBanner: boolean;
  shouldConnect: boolean;
  hasNoMyReply: boolean;
  hasNoPartnerReply: boolean;
  showPartnerAnswer: boolean;
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
    partnerTodayAnswers,
    nickname,
    partnerNickname,
    coupleMissionId,
    isPremiumUser,
  } = usePrimary_HomeTodayMission();
  const { submitAnswers } = usePrimary_HomeSubmitMission();
  const { progress, incrementProgress, decrementProgress, resetProgress } =
    usePrimary_HomeProgress();
  const { userAnswer, setQuestionIds, setAnswerByQuestion } = usePrimary_HomeAnswerInputManager({
    savedOnboardingData,
    todayMissionId,
  });
  const { isKeyboardShown, hideKeyboard } = usePrimary_HomeKeyboardManager();
  const { openOnboardingUserModal, openPreventMissionReminderModal } = usePrimary_HomeOpenModal();
  const { goConnectCouple, goNotificationMission } = usePrimary_HomeNavigation();
  const { missionReminder } = usePrimary_HomeMissionReminder();
  const { checkDayReminder } = usePrimary_HomeDayReminderManager();
  const { checkMinutesReminder } = usePrimary_HomeMinutesReminderManager();
  const {
    clickConnectCoupleMixpanelEvent,
    requestReminderMixpanelEvent,
    viewPartnerAnswerMixpanelEvent,
  } = usePrimary_HomeMixpanel();

  const isLoading = isOnboardingQuestionLoading || isTodayMissionLoading;
  const isWritable = isOnboarindgUserWritable || isTodayWritable;

  const showBanner =
    (!isCoupled ||
      (isCoupled && !todayAnswersCompleted && partnerTodayAnswersCompleted) ||
      (isCoupled && todayAnswersCompleted && !partnerTodayAnswersCompleted)) &&
    !isKeyboardShown;
  const shouldConnect = !isCoupled;
  const hasNoMyReply = isCoupled && !todayAnswersCompleted && partnerTodayAnswersCompleted;
  const hasNoPartnerReply = isCoupled && todayAnswersCompleted && !partnerTodayAnswersCompleted;
  const showPartnerAnswer = isCoupled && todayAnswersCompleted && partnerTodayAnswersCompleted;

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

  const currentPartnerAnswer = useMemo(() => {
    if (!!partnerTodayAnswers) {
      return partnerTodayAnswers[progress - 1].content;
    }
  }, [partnerTodayAnswers, progress]);

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
        coupleMissionId: coupleMissionId,
        onCompleted: () => {
          resetProgress();

          if (todayMissionId === ONBOARDING_MISSION_ID) {
            goNotificationMission();
          }
        },
      });
    }
  }, [
    userAnswer,
    progress,
    isLastQuestion,
    todayMissionId,
    coupleMissionId,
    isOnboarindgUserWritable,
    incrementProgress,
    hideKeyboard,
    openOnboardingUserModal,
    saveOnboardingUserAnswer,
    resetProgress,
    submitAnswers,
    goNotificationMission,
  ]);

  const pressBannerButton = useCallback(async () => {
    if (!isCoupled) {
      clickConnectCoupleMixpanelEvent();
      goConnectCouple();
      return;
    }

    requestReminderMixpanelEvent(todayMissionId);

    if (hasNoPartnerReply) {
      if (isPremiumUser) {
        const isBlocked = await checkDayReminder({
          openPreventModal: openPreventMissionReminderModal,
        });

        if (isBlocked) {
          return;
        }
      }

      if (!isPremiumUser) {
        const isBlocked = await checkMinutesReminder({
          openPreventModal: openPreventMissionReminderModal,
        });

        if (isBlocked) {
          return;
        }
      }

      await missionReminder(coupleMissionId);
    }
  }, [
    checkDayReminder,
    checkMinutesReminder,
    openPreventMissionReminderModal,
    goConnectCouple,
    clickConnectCoupleMixpanelEvent,
    requestReminderMixpanelEvent,
    isCoupled,
    isPremiumUser,
    hasNoPartnerReply,
    todayMissionId,
    coupleMissionId,
  ]);

  useEffectOnceWhen(() => {
    setQuestionIds(questions);
  }, !!questions);

  useEffectOnceWhen(() => {
    viewPartnerAnswerMixpanelEvent({ missionId: todayMissionId, questions });
  }, showPartnerAnswer);

  return {
    isLoading,
    isWritable,
    progress,
    question,
    currentValue,
    currentUserAnswer,
    currentPartnerAnswer,
    nickname,
    partnerNickname,
    isCTADisabled,
    isLastQuestion,
    showBanner,
    shouldConnect,
    hasNoMyReply,
    hasNoPartnerReply,
    showPartnerAnswer,
    direction,
    animationKeyIndex,
    panGesture,
    setAnswer,
    pressCTA,
    pressBannerButton,
  };
};
