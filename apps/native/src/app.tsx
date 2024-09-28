import React, { Suspense } from 'react';

import { LoadingSpinner, UIProvider } from './mobile-ui';
import { ApolloProvider, AuthProvider, MMKVProvider, RecoilProvider } from './providers';
import { RootNavigator, RootStack } from './screens';

function App(): React.JSX.Element {
  return (
    <RecoilProvider>
      <UIProvider>
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
      </UIProvider>
    </RecoilProvider>
  );
}

export default App;
