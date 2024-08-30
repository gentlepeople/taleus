import React from 'react';

import { UIProvider } from './mobile-ui';
import { RecoilProvider } from './providers';
import { RootNavigator, RootStack } from './screens';

function App(): React.JSX.Element {
  // 1. npm install react-native-rename -g
  // 2. react-native-rename <newName>
  // 3. react-native upgrade

  // 업데이트 해야 할 목록들 : unauthenticated, authenticated, modal, common 만들어 놓기 (필요한 패키지들도, 필요 시 삭제하면 되니까)

  return (
    <RecoilProvider>
      <UIProvider>
        <RootNavigator>
          <RootStack />
        </RootNavigator>
      </UIProvider>
    </RecoilProvider>
  );
}

export default App;
