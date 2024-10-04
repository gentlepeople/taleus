import { useCallback } from 'react';
import { EMixpanelEventType, useMixpanel } from '~/providers';

type IAuthentication_SignUpMixpanelInput = void;
type IAuthentication_SignUpMixpanelOutput = {
  clickSignUpMixpanelEvent: () => void;
};

export const useAuthentication_SignUpMixpanel: Hook<
  IAuthentication_SignUpMixpanelInput,
  IAuthentication_SignUpMixpanelOutput
> = () => {
  const { mixpanel } = useMixpanel();

  const clickSignUpMixpanelEvent = useCallback(() => {
    mixpanel.trackEvent({
      type: EMixpanelEventType.CLICK_SIGNUP,
      properties: {},
    });
  }, [mixpanel]);

  return { clickSignUpMixpanelEvent };
};
