import { useCallback } from 'react';
import { EMixpanelEventType, useMixpanel } from '~/providers';
import { convertCategory } from '~/utils';
import { IViewAnswerMixpanelEventParams } from '../../../feed-detail.type';

type IFeed_DetailMixpanelInput = void;
type IFeed_DetailMixpanelOutput = {
  viewFirstAnswerMixpanelEvent: ({
    missionId,
    questionId,
    questionOrder,
    category,
    formattedDate,
  }: IViewAnswerMixpanelEventParams) => void;
  viewSecondAnswerMixpanelEvent: ({
    missionId,
    questionId,
    questionOrder,
    category,
    formattedDate,
  }: IViewAnswerMixpanelEventParams) => void;
  viewThirdAnswerMixpanelEvent: ({
    missionId,
    questionId,
    questionOrder,
    category,
    formattedDate,
  }: IViewAnswerMixpanelEventParams) => void;
};

export const useFeed_DetailMixpanel: Hook<
  IFeed_DetailMixpanelInput,
  IFeed_DetailMixpanelOutput
> = () => {
  const { mixpanel } = useMixpanel();

  const viewFirstAnswerMixpanelEvent = useCallback(
    ({
      missionId,
      questionId,
      questionOrder,
      category,
      formattedDate,
    }: IViewAnswerMixpanelEventParams) => {
      const convertedCategory = convertCategory(category);

      mixpanel.trackEvent({
        type: EMixpanelEventType.VIEW_FIRST_ANSWER,
        properties: {
          mission_id: missionId,
          question_id: questionId,
          question_order: questionOrder,
          question_category: convertedCategory,
          submit_date: formattedDate,
        },
      });
    },
    [mixpanel],
  );

  const viewSecondAnswerMixpanelEvent = useCallback(
    ({
      missionId,
      questionId,
      questionOrder,
      category,
      formattedDate,
    }: IViewAnswerMixpanelEventParams) => {
      const convertedCategory = convertCategory(category);

      mixpanel.trackEvent({
        type: EMixpanelEventType.VIEW_SECOND_ANSWER,
        properties: {
          mission_id: missionId,
          question_id: questionId,
          question_order: questionOrder,
          question_category: convertedCategory,
          submit_date: formattedDate,
        },
      });
    },
    [mixpanel],
  );

  const viewThirdAnswerMixpanelEvent = useCallback(
    ({
      missionId,
      questionId,
      questionOrder,
      category,
      formattedDate,
    }: IViewAnswerMixpanelEventParams) => {
      const convertedCategory = convertCategory(category);

      mixpanel.trackEvent({
        type: EMixpanelEventType.VIEW_THIRD_ANSWER,
        properties: {
          mission_id: missionId,
          question_id: questionId,
          question_order: questionOrder,
          question_category: convertedCategory,
          submit_date: formattedDate,
        },
      });
    },
    [mixpanel],
  );

  return {
    viewFirstAnswerMixpanelEvent,
    viewSecondAnswerMixpanelEvent,
    viewThirdAnswerMixpanelEvent,
  };
};
