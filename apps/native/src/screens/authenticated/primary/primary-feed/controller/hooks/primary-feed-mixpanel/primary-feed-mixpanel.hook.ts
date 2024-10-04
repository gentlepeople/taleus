import { useCallback } from 'react';
import { EMixpanelEventType, useMixpanel } from '~/providers';

type IPrimary_FeedMixpanelInput = void;
type IPrimary_FeedMixpanelOutput = {};

export const usePrimary_FeedMixpanel: Hook<
  IPrimary_FeedMixpanelInput,
  IPrimary_FeedMixpanelOutput
> = () => {
  const { mixpanel } = useMixpanel();

  // TODO:민기 fix!
  const selectRecordMixpanelEvent = useCallback(() => {
    mixpanel.trackEvent({
      type: EMixpanelEventType.SELECT_RECORD,
      properties: {
        question_id: 1,
        question_category: 'z',
        submit_date: new Date(),
      },
    });
  }, [mixpanel]);

  return {};
};
