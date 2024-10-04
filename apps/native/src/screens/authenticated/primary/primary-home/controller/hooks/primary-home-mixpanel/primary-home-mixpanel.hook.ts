import { useCallback } from 'react';
import { EMixpanelEventType, useMixpanel } from '~/providers';
import { IViewPartnerAnswerMixpanelEventParams } from '../../../primary-home.type';

type IPrimary_HomeMixpanelInput = void;
type IPrimary_HomeMixpanelOutput = {
  clickConnectCoupleMixpanelEvent: () => void;
  requestReminderMixpanelEvent: () => void;
  viewPartnerAnswerMixpanelEvent: ({
    questionId,
    questionSubId,
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

  const requestReminderMixpanelEvent = useCallback(() => {
    mixpanel.trackEvent({
      type: EMixpanelEventType.REQUEST_REMINDER,
      properties: {},
    });
  }, [mixpanel]);

  const viewPartnerAnswerMixpanelEvent = useCallback(
    ({ questionId, questionSubId }: IViewPartnerAnswerMixpanelEventParams) => {
      mixpanel.trackEvent({
        type: EMixpanelEventType.VIEW_PATNER_ANSWER,
        properties: {
          question_id: 1,
          question_subid: 1,
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
