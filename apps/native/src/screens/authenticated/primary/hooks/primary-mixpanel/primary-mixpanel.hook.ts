import { useCallback } from 'react';
import { EMixpanelEventType, useMixpanel } from '~/providers';

type IPrimaryMixpanelInput = void;
type IPrimaryMixpanelOutput = {
  selectAppBarMixpanelEvent: (screen: string) => void;
};

export const usePrimaryMixpanel: Hook<IPrimaryMixpanelInput, IPrimaryMixpanelOutput> = () => {
  const { mixpanel } = useMixpanel();

  const selectAppBarMixpanelEvent = useCallback(
    (screen: string) => {
      mixpanel.trackEvent({
        type: EMixpanelEventType.SELECT_APP_BAR,
        properties: {
          screen,
        },
      });
    },
    [mixpanel],
  );

  return {
    selectAppBarMixpanelEvent,
  };
};
