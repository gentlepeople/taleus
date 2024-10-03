import { createContext, useContext, useState } from 'react';
import { useDidMount } from 'rooks';

import Config from 'react-native-config';
import { IMixpanelContext, IMixpanelProviderProps, Mixpanel } from './mixpanel.type';

export const MixpanelContext = createContext<IMixpanelContext>(null);

export const MixpanelProvider = ({ children }: IMixpanelProviderProps) => {
  const [mixpanel, setMixpanel] = useState<Mixpanel>(null);
  const setupMixpanel = async () => {
    const mixpanelToken = Config.MIXPANEL_TEST_TOKEN;
    // const mixpanelToken = Config.MIXPANEL_MASTER_TOKEN;
    const mixpanelInstance = new Mixpanel(mixpanelToken);

    await mixpanelInstance.init();

    if (__DEV__) {
      mixpanelInstance.setLoggingEnabled(true);
    }

    setMixpanel(mixpanelInstance);
  };

  useDidMount(() => {
    setupMixpanel();
  });

  if (!mixpanel) {
    return null;
  }
  return <MixpanelContext.Provider value={{ mixpanel }}>{children}</MixpanelContext.Provider>;
};

export const useMixpanel = () => {
  const context = useContext(MixpanelContext);

  if (!context) {
    throw new Error('useMixpanel must be used within a Mixpanel');
  }

  return context;
};
