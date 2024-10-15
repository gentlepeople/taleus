import {
  ApolloClient,
  DefaultOptions,
  InMemoryCache,
  ApolloClient as NativeApolloClient,
  NormalizedCacheObject,
} from '@apollo/client';
import auth from '@react-native-firebase/auth';
import { useState } from 'react';
import { useDidMount } from 'rooks';

import { offsetLimitPagination } from '@apollo/client/utilities';
import isNull from 'lodash/isNull';
import { useApolloLink } from '../apollo-link';

export const useApolloInit = () => {
  const [apolloClient, setApolloClient] = useState<ApolloClient<NormalizedCacheObject>>();
  const [isTokenUpdating, setIsTokenUpdating] = useState<boolean>();
  const { link, setAuthToken } = useApolloLink();

  const getIdToken = async () => {
    if (isNull(auth().currentUser)) {
      return null;
    }

    return await auth().currentUser.getIdToken();
  };

  const apolloClientDefaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'cache-first',
      notifyOnNetworkStatusChange: false,
      returnPartialData: false,
      refetchWritePolicy: 'overwrite',
    },
  };

  const initializeApolloClient = async (token?: string | null) => {
    const cache = new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            completedCoupleMissions: offsetLimitPagination(),
          },
        },
      },
    });

    const apolloClient = new NativeApolloClient({
      link: link,
      cache: cache,
      // The useQuery hook uses Apollo Client's watchQuery function.
      // To set defaultOptions when using the useQuery hook,
      // make sure to set them under the defaultOptions.watchQuery property.
      defaultOptions: apolloClientDefaultOptions,
    });
    return apolloClient;
  };

  useDidMount(() => {
    (async () => {
      const token = await getIdToken();

      if (!isNull(token)) {
        setIsTokenUpdating(true);
        await setAuthToken(token);
      }

      const apolloClient = await initializeApolloClient();
      setApolloClient(apolloClient);
      setIsTokenUpdating(false);
    })();
  });

  const updateToken = async (token?: string | null) => {
    setIsTokenUpdating(true);
    await setAuthToken(token);
    const apolloClient = await initializeApolloClient();
    setApolloClient(apolloClient);
    setIsTokenUpdating(false);
  };

  return { apolloClient, updateToken, isTokenUpdating };
};
