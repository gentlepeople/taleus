import React, { Suspense } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { useDidMount } from 'rooks';
import { LoadingSpinner, UIProvider } from './mobile-ui';
import {
  AdMobProvider,
  ApolloProvider,
  AuthProvider,
  MMKVProvider,
  MixpanelProvider,
  OneSignalProvider,
  RecoilProvider,
} from './providers';
import { RootNavigator, RootStack } from './screens';

function App(): React.JSX.Element {
  useDidMount(() => {
    RNBootSplash.hide();
  });

  return (
    <RecoilProvider>
      <UIProvider>
        <MMKVProvider>
          <MixpanelProvider>
            <Suspense fallback={<LoadingSpinner />}>
              <AdMobProvider>
                <OneSignalProvider>
                  <ApolloProvider>
                    <AuthProvider>
                      <RootNavigator>
                        <RootStack />
                      </RootNavigator>
                    </AuthProvider>
                  </ApolloProvider>
                </OneSignalProvider>
              </AdMobProvider>
            </Suspense>
          </MixpanelProvider>
        </MMKVProvider>
      </UIProvider>
    </RecoilProvider>
  );
}

export default App;
