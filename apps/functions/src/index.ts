import { Express } from 'express';
import * as admin from 'firebase-admin';
import { onRequest } from 'firebase-functions/v2/https';

import { createApiNestServer } from './adapter/in/api/api.bootstrap';
import { createGraphQLNestServer } from './adapter/in/graphql/graphql.bootstrap';

admin.initializeApp();

const firestore = admin.firestore();

firestore.settings({ ignoreUndefinedProperties: true });

let graphqlNestServer: Express;

export const graphql = onRequest(
  {
    region: 'asia-northeast3',
    memory: '512MiB',
    minInstances: 1,
    timeoutSeconds: 600,
    vpcConnector: process.env.VPC_CONNECTOR,
    vpcConnectorEgressSettings: 'ALL_TRAFFIC',
  },
  async (req, resp) => {
    if (!graphqlNestServer) {
      graphqlNestServer = await createGraphQLNestServer();
    }
    return graphqlNestServer(req, resp);
  },
);

let apiNestServer: Express;

export const api = onRequest(
  {
    region: 'asia-northeast3',
    memory: '512MiB',
    minInstances: 0,
    timeoutSeconds: 600,
    vpcConnector: process.env.VPC_CONNECTOR,
    vpcConnectorEgressSettings: 'ALL_TRAFFIC',
  },
  async (req, resp) => {
    if (!apiNestServer) {
      apiNestServer = await createApiNestServer();
    }
    return apiNestServer(req, resp);
  },
);
