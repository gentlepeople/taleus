import { useCallback } from 'react';
import { EAuthType, EMixpanelEventType, useMixpanel } from '~/providers';

type IAuthentication_LandingMixpanelInput = void;
type IAuthentication_LandingMixpanelOutput = {
  clickLoginMixpanelEvent: (buttonType: EAuthType) => void;
  clickViewMoreMixpanelEvent: () => void;
};

export const useAuthentication_LandingMixpanel: Hook<
  IAuthentication_LandingMixpanelInput,
  IAuthentication_LandingMixpanelOutput
> = () => {
  const { mixpanel } = useMixpanel();

  const clickLoginMixpanelEvent = useCallback(
    (buttonType: EAuthType) => {
      mixpanel.trackEvent({
        type: EMixpanelEventType.CLICK_LOGIN,
        properties: {
          button_type: buttonType,
        },
      });
    },
    [mixpanel],
  );

  const clickViewMoreMixpanelEvent = useCallback(() => {
    mixpanel.trackEvent({
      type: EMixpanelEventType.CLICK_VIEW_MORE,
      properties: {},
    });
  }, [mixpanel]);

  return { clickLoginMixpanelEvent, clickViewMoreMixpanelEvent };
};
