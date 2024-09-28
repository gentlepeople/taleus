import { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  SafeAreaProvider,
  SafeAreaView,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

import { MutationIndicatorProvider } from '../../providers';
import { palette } from '../theme';

import { ScrollProvider } from './scroll';
import { StacksProvider } from './stacks';

export * from './scroll';

export type IMobileUIContext = {};

export type MobileUIProviderProps = {
  children: ReactNode;
};

export const UIProvider = ({ children }: MobileUIProviderProps) => {
  return (
    <SafeAreaProvider
      initialMetrics={initialWindowMetrics}
      style={{ flex: 1, backgroundColor: palette['white-100'] }}
    >
      <StatusBar animated barStyle="light-content" />
      <StacksProvider>
        <ScrollProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
              <MutationIndicatorProvider>
                <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  behavior="padding"
                  enabled={Platform.OS === 'ios'}
                >
                  {children}
                </KeyboardAvoidingView>
              </MutationIndicatorProvider>
            </SafeAreaView>
          </GestureHandlerRootView>
        </ScrollProvider>
      </StacksProvider>
    </SafeAreaProvider>
  );
};
