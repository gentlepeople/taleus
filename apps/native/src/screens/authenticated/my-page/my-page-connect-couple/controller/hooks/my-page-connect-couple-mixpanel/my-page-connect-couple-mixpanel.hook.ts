import { useCallback } from 'react';
import { EMixpanelEventType, useMixpanel } from '~/providers';

type IMyPage_ConnectCoupleMixpanelInput = void;
type IMyPage_ConnectCoupleMixpanelOutput = {
  copyCoupleCodeMixpanelEvent: (coupleCode: string) => void;
  shareCoupleCodeMixpanelEvent: (coupleCode: string) => void;
};

export const useMyPage_ConnectCoupleMixpanel: Hook<
  IMyPage_ConnectCoupleMixpanelInput,
  IMyPage_ConnectCoupleMixpanelOutput
> = () => {
  const { mixpanel } = useMixpanel();

  const copyCoupleCodeMixpanelEvent = useCallback(
    (coupleCode: string) => {
      mixpanel.trackEvent({
        type: EMixpanelEventType.COPY_COUPLE_CODE,
        properties: {
          couple_code: coupleCode,
        },
      });
    },
    [mixpanel],
  );

  const shareCoupleCodeMixpanelEvent = useCallback(
    (coupleCode: string) => {
      mixpanel.trackEvent({
        type: EMixpanelEventType.SHARE_COUPLE_CODE,
        properties: {
          couple_code: coupleCode,
        },
      });
    },
    [mixpanel],
  );

  return { copyCoupleCodeMixpanelEvent, shareCoupleCodeMixpanelEvent };
};
