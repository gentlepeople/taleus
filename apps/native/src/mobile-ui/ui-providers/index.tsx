import { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { SystemBars } from 'react-native-bars';
import {
  SafeAreaProvider,
  SafeAreaView,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

import { ScrollProvider } from './scroll';
import { StacksProvider } from './stacks';

export * from './scroll';

export type IMobileUIContext = {};

export type MobileUIProviderProps = {
  children: ReactNode;
};

export const UIProvider = ({ children }: MobileUIProviderProps) => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics} style={{ flex: 1 }}>
      <StacksProvider>
        <ScrollProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior="padding"
              enabled={Platform.OS === 'ios'}
            >
              <SystemBars animated={true} barStyle="light-content" />
              {children}
            </KeyboardAvoidingView>
          </SafeAreaView>
        </ScrollProvider>
      </StacksProvider>
    </SafeAreaProvider>
  );
};
