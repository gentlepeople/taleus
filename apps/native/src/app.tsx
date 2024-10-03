import React, { Suspense } from 'react';

import { LoadingSpinner, UIProvider } from './mobile-ui';
import {
  ApolloProvider,
  AuthProvider,
  MMKVProvider,
  MixpanelProvider,
  RecoilProvider,
} from './providers';
import { RootNavigator, RootStack } from './screens';

function App(): React.JSX.Element {
  return (
    <RecoilProvider>
      <UIProvider>
        <MixpanelProvider>
          <Suspense fallback={<LoadingSpinner />}>
            <ApolloProvider>
              <AuthProvider>
                <MMKVProvider>
                  <RootNavigator>
                    <RootStack />
                  </RootNavigator>
                </MMKVProvider>
              </AuthProvider>
            </ApolloProvider>
          </Suspense>
        </MixpanelProvider>
      </UIProvider>
    </RecoilProvider>
  );
}

export default App;
