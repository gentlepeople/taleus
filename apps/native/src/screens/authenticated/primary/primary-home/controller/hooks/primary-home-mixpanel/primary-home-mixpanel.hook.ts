import { useCallback } from 'react';
import { EMixpanelEventType, useMixpanel } from '~/providers';
import { IViewPartnerAnswerMixpanelEventParams } from '../../../primary-home.type';

type IPrimary_HomeMixpanelInput = void;
type IPrimary_HomeMixpanelOutput = {
  clickConnectCoupleMixpanelEvent: () => void;
  requestReminderMixpanelEvent: (missionId: number) => void;
  viewPartnerAnswerMixpanelEvent: ({
    missionId,
    questions,
  }: IViewPartnerAnswerMixpanelEventParams) => void;
};

export const usePrimary_HomeMixpanel: Hook<
  IPrimary_HomeMixpanelInput,
  IPrimary_HomeMixpanelOutput
> = () => {
  const { mixpanel } = useMixpanel();

  const clickConnectCoupleMixpanelEvent = useCallback(() => {
    mixpanel.trackEvent({
      type: EMixpanelEventType.CLICK_CONNECT_COUPLE,
      properties: {},
    });
  }, [mixpanel]);

  const requestReminderMixpanelEvent = useCallback(
    (missionId: number) => {
      mixpanel.trackEvent({
        type: EMixpanelEventType.REQUEST_REMINDER,
        properties: {
          mission_id: missionId,
        },
      });
    },
    [mixpanel],
  );

  const viewPartnerAnswerMixpanelEvent = useCallback(
    ({ missionId, questions }: IViewPartnerAnswerMixpanelEventParams) => {
      const { questionIds, questionOrders } = questions.reduce(
        (acc, q) => {
          acc.questionIds.push(q.questionId);
          acc.questionOrders.push(q.questionOrder);
          return acc;
        },
        { questionIds: [], questionOrders: [] } as {
          questionIds: number[];
          questionOrders: number[];
        },
      );

      mixpanel.trackEvent({
        type: EMixpanelEventType.VIEW_PATNER_ANSWER,
        properties: {
          mission_id: missionId,
          question_ids: questionIds,
          question_orders: questionOrders,
        },
      });
    },
    [mixpanel],
  );

  return {
    clickConnectCoupleMixpanelEvent,
    requestReminderMixpanelEvent,
    viewPartnerAnswerMixpanelEvent,
  };
};
