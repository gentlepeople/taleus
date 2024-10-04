import React, { Suspense } from 'react';

import { LoadingSpinner, UIProvider } from './mobile-ui';
import {
  ApolloProvider,
  AuthProvider,
  MMKVProvider,
  MixpanelProvider,
  OneSignalProvider,
  RecoilProvider,
} from './providers';
import { RootNavigator, RootStack } from './screens';

function App(): React.JSX.Element {
  return (
    <RecoilProvider>
      <UIProvider>
        <MMKVProvider>
          <MixpanelProvider>
            <Suspense fallback={<LoadingSpinner />}>
              <OneSignalProvider>
                <ApolloProvider>
                  <AuthProvider>
                    <RootNavigator>
                      <RootStack />
                    </RootNavigator>
                  </AuthProvider>
                </ApolloProvider>
              </OneSignalProvider>
            </Suspense>
          </MixpanelProvider>
        </MMKVProvider>
      </UIProvider>
    </RecoilProvider>
  );
}

export default App;
