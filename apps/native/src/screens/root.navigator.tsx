import {
  DefaultTheme,
  LinkingOptions,
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';

import { useRef } from 'react';
import { Linking, View } from 'react-native';

import { RootStackParamList, rootStackLinkingConfig } from './root.stack';

export const RootNavigator = ({ children }) => {
  const navigationRef = useNavigationContainerRef<RootStackParamList>();
  const routeNameRef = useRef<string>();

  const linking: LinkingOptions<RootStackParamList> = {
    prefixes: ['example_app_url://'],
    getInitialURL: async () => {
      const url = await Linking.getInitialURL();
      return url;
    },
    subscribe: (listener) => {
      // First, you may want to do the default deep link handling
      const onReceiveURL = async ({ url }: { url: string }) => {
        return listener(url);
      };

      // Listen to incoming links from deep linking
      Linking.addEventListener('url', onReceiveURL);
    },
    // Custom function to get the URL which was used to open the app
    config: rootStackLinkingConfig,
  };

  const handleRootNavigatorReady = async () => {
    // write the code want to start when the root navigator onReady
    // ex) Channel talk
  };

  const handleRootNavigatorStateChange = async () => {
    if (!navigationRef.isReady()) {
      return;
    }

    const previousRouteName = routeNameRef.current;
    const navigationCurrentRoute = navigationRef.getCurrentRoute();
    const currentRouteName = navigationCurrentRoute && navigationCurrentRoute.name;
    const currentRouteParams = navigationCurrentRoute && navigationCurrentRoute.params;

    // write the code want to start when the root navigator onStateChange
    // ex) sentry, mixpanel etc.

    // const trackScreenView = (currentRouteName: string, currentRouteParams: object) => {
    //   sentry.setExtra('currentRouteName', currentRouteName);
    //   sentry.setExtra('currentRouteParams', currentRouteParams);
    //   mixpanel.registerSuperProperties({
    //     currentRouteName: currentRouteName,
    //   });
    // };

    if (previousRouteName !== currentRouteName) {
      // Save the current route name for later comparison
      routeNameRef.current = currentRouteName;

      // call example function with currentRouteName, currentRouteParams
      // ex) trackScreenView(currentRouteName, currentRouteParams);
    }
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: 'transparent',
        },
      }}
      linking={linking}
      onReady={handleRootNavigatorReady}
      onStateChange={handleRootNavigatorStateChange}
      // Should make the LoadingPage component on mobile-ui and use for fallback
      fallback={<View />}
    >
      {children}
    </NavigationContainer>
  );
};
