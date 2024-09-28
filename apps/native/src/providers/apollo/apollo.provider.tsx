import {
  ApolloClient,
  ApolloProvider as NativeApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client';
import { ReactNode, createContext, useContext } from 'react';

import { Suspender } from '../../mobile-ui/common/suspender';

import { useApolloCachePersist, useApolloInit } from './hooks';

export interface IApolloContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  clearCache: () => void;
  updateToken: (token?: string | null) => Promise<void>;
}

export const ApolloContext = createContext<IApolloContext | null>(null);

type IApolloProviderProps = {
  children: ReactNode;
};

export const ApolloProvider = ({ children }: IApolloProviderProps) => {
  const { apolloClient, updateToken, isTokenUpdating } = useApolloInit();
  const { clearCache } = useApolloCachePersist();

  if (!apolloClient || isTokenUpdating) {
    return <Suspender />;
  }

  return (
    <ApolloContext.Provider
      value={{
        apolloClient,
        clearCache,
        updateToken,
      }}
    >
      <NativeApolloProvider client={apolloClient}>{children}</NativeApolloProvider>
    </ApolloContext.Provider>
  );
};

export const useApollo = () => {
  const context = useContext(ApolloContext);

  if (!context) {
    throw new Error('useApollo must be used within a ApolloProvider');
  }
  return context;
};
