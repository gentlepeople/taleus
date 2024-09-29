import { ApolloLink, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import Config from 'react-native-config';
import { getTimeZone } from 'react-native-localize';

import { INITIAL_RETRY_DELAY, MAX_RETRY_COUNT } from './apollo-link.const';

let authToken: string | null = null; // 외부에서 사용할 수 있도록 authToken 상태 유지

export const useApolloLink = () => {
  const isLocal = __DEV__ && Config.DOPPLER_ENVIRONMENT === 'local';

  const timeZone = getTimeZone();

  const wsLink = new GraphQLWsLink(
    createClient({
      url: Config.APOLLO_MASTER_ENDPOINT,
      connectionParams: {
        headers: {
          authorization: authToken ? `Bearer ${authToken}` : '',
          'content-type': 'application/json',
          'time-zone': timeZone,
        },
      },
    }),
  );

  // authLink에서 토큰을 동적으로 추가
  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: authToken ? `Bearer ${authToken}` : '',
        'content-type': 'application/json',
        'time-zone': timeZone,
      },
    }));
    return forward(operation);
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.error(`[GraphQL error]: ${message}, Location: ${locations}, Path: ${path}`);
      });
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  });

  const httplink = new HttpLink({
    uri: Config.APOLLO_MASTER_ENDPOINT,
    headers: {
      authorization: authToken ? `Bearer ${authToken}` : '',
      'content-type': 'application/json',
      'time-zone': timeZone,
    },
  });

  const terminatingLink = new RetryLink({
    delay: {
      initial: INITIAL_RETRY_DELAY,
      max: Infinity,
      jitter: true,
    },
    attempts: {
      max: MAX_RETRY_COUNT,
      retryIf: (error, _operation) => !!error,
    },
  }).split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    httplink,
  );

  const link = from([authLink, errorLink, terminatingLink]);

  const setAuthToken = async (token?: string | null) => {
    authToken = token;
  };

  return { link, setAuthToken };
};
