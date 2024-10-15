import { PanGesture } from 'react-native-gesture-handler';

import { EDirection } from '~/mobile-ui';

import { useCallback, useEffect, useMemo } from 'react';
import { INITIAL_PROGRESS, LAST_PROGRESS, SECOND_PROGRESS } from '../feed-detail.const';
import { IAnswer } from '../feed-detail.type';
import {
  useFeed_DetailAnimationKey,
  useFeed_DetailData,
  useFeed_DetailEditManager,
  useFeed_DetailGestureHandler,
  useFeed_DetailMixpanel,
  useFeed_DetailOpenModal,
  useFeed_DetailProgress,
  useFeed_DetailUpdateUserResponse,
} from './hooks';

type IFeed_DetailControllerInput = void;
type IFeed_DetailControllerOutput = {
  isFeedDataLoading: boolean;
  currentAnswer: IAnswer;
  currentQuestion: string;
  submittedDate: string;
  nickname: string;
  partnerNickname: string;
  newContent: string;
  isEdit: boolean;
  isCTADisabled: boolean;
  direction: EDirection;
  animationKeyIndex: string;
  panGesture: PanGesture;
  progress: number;
  startEdit: () => void;
  pressCTA: () => Promise<void>;
  setNewContent: (text: string) => void;
};

export const useFeed_DetailController: Controller<
  IFeed_DetailControllerInput,
  IFeed_DetailControllerOutput
> = () => {
  const {
    isFeedDataLoading,
    answers,
    submittedDate,
    nickname,
    partnerNickname,
    missionId,
    category,
    recentDate,
  } = useFeed_DetailData();
  const { updateUserResponse } = useFeed_DetailUpdateUserResponse();
  const { newContent, isEdit, startEdit, endEdit, setContent } = useFeed_DetailEditManager();
  const { progress, incrementProgress, decrementProgress } = useFeed_DetailProgress();
  const { openCheckEditModal, openCheckSwipeModal } = useFeed_DetailOpenModal();
  const {
    viewFirstAnswerMixpanelEvent,
    viewSecondAnswerMixpanelEvent,
    viewThirdAnswerMixpanelEvent,
  } = useFeed_DetailMixpanel();

  const { direction, animationKeyIndex, nextQuestionAnimation, prevQuestionAnimation } =
    useFeed_DetailAnimationKey();
  const { panGesture } = useFeed_DetailGestureHandler({
    onLeftSwipe: () => {
      if (progress === LAST_PROGRESS) {
        return;
      }

      if (isEdit) {
        openCheckSwipeModal(() => {
          endEdit();
          nextQuestionAnimation();
          incrementProgress();
        });

        return;
      }

      nextQuestionAnimation();
      incrementProgress();
    },
    onRightSwipe: () => {
      if (progress === INITIAL_PROGRESS) {
        return;
      }

      if (isEdit) {
        openCheckSwipeModal(endEdit);
        prevQuestionAnimation();
        decrementProgress();
        return;
      }

      prevQuestionAnimation();
      decrementProgress();
    },
  });

  const currentAnswer = useMemo(() => {
    return answers[progress - 1];
  }, [progress, answers]);

  const currentQuestion = useMemo(() => {
    if (currentAnswer) {
      return currentAnswer.questionTitle;
    }
  }, [currentAnswer]);

  const currentUserResponseId = useMemo(() => {
    if (currentAnswer) {
      return currentAnswer.userResponseId;
    }
  }, [currentAnswer]);

  const currentUserAnswer = useMemo(() => {
    if (currentAnswer) {
      return currentAnswer.userAnswer;
    }
  }, [currentAnswer]);

  const editComplete = useCallback(async () => {
    await updateUserResponse({ responseId: currentUserResponseId, newContent });
  }, [updateUserResponse, currentUserResponseId, newContent]);

  const pressCTA = useCallback(async () => {
    const isNoEditAnything = currentUserAnswer === newContent;
    if (isNoEditAnything) {
      endEdit();
      return;
    }

    openCheckEditModal({
      onCancel: () => {
        endEdit();
        setContent(currentUserAnswer);
      },
      onComplete: async () => {
        await editComplete();
        endEdit();
      },
    });
  }, [endEdit, openCheckEditModal, editComplete, newContent, currentUserAnswer]);

  const setNewContent = useCallback(
    (text: string) => {
      setContent(text);
    },
    [newContent, setContent],
  );

  useEffect(() => {
    if (isEdit) {
      return;
    }

    setContent(currentUserAnswer);
  }, [currentUserAnswer, setContent, isEdit]);

  useEffect(() => {
    if (isFeedDataLoading) {
      return;
    }

    if (progress === INITIAL_PROGRESS) {
      viewFirstAnswerMixpanelEvent({
        missionId,
        questionId: currentAnswer.questionId,
        questionOrder: currentAnswer.questionOrder,
        category,
        formattedDate: recentDate,
      });
      return;
    }

    if (progress === SECOND_PROGRESS) {
      viewSecondAnswerMixpanelEvent({
        missionId,
        questionId: currentAnswer.questionId,
        questionOrder: currentAnswer.questionOrder,
        category,
        formattedDate: recentDate,
      });
      return;
    }

    if (progress === LAST_PROGRESS) {
      viewThirdAnswerMixpanelEvent({
        missionId,
        questionId: currentAnswer.questionId,
        questionOrder: currentAnswer.questionOrder,
        category,
        formattedDate: recentDate,
      });
      return;
    }
  }, [
    progress,
    currentAnswer,
    missionId,
    category,
    recentDate,
    viewFirstAnswerMixpanelEvent,
    viewSecondAnswerMixpanelEvent,
    viewThirdAnswerMixpanelEvent,
  ]);

  const isCTADisabled = newContent && newContent.length > 200;

  return {
    isFeedDataLoading,
    currentAnswer,
    currentQuestion,
    submittedDate,
    newContent,
    nickname,
    partnerNickname,
    isEdit,
    isCTADisabled,
    direction,
    animationKeyIndex,
    panGesture,
    progress,
    startEdit,
    pressCTA,
    setNewContent,
  };
};
