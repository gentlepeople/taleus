import { useCallback } from 'react';
import { EMixpanelEventType, useMixpanel } from '~/providers';

type IFeed_DetailMixpanelInput = void;
type IFeed_DetailMixpanelOutput = {};

export const useFeed_DetailMixpanel: Hook<
  IFeed_DetailMixpanelInput,
  IFeed_DetailMixpanelOutput
> = () => {
  const { mixpanel } = useMixpanel();

  // TODO:민기 fix!
  const viewFirstAnswerMixpanelEvent = useCallback(() => {
    mixpanel.trackEvent({
      type: EMixpanelEventType.VIEW_FIRST_ANSWER,
      properties: {
        question_id: 1,
        question_subid: 1,
        question_category: '',
        submit_date: new Date(),
      },
    });
  }, [mixpanel]);

  const viewSecondeAnswerMixpanelEvent = useCallback(() => {
    mixpanel.trackEvent({
      type: EMixpanelEventType.VIEW_SECOND_ANSWER,
      properties: {
        question_id: 1,
        question_subid: 1,
        question_category: '',
        submit_date: new Date(),
      },
    });
  }, [mixpanel]);

  const viewThirdAnswerMixpanelEvent = useCallback(() => {
    mixpanel.trackEvent({
      type: EMixpanelEventType.VIEW_THIRD_ANSWER,
      properties: {
        question_id: 1,
        question_subid: 1,
        question_category: '',
        submit_date: new Date(),
      },
    });
  }, [mixpanel]);

  return {};
};
