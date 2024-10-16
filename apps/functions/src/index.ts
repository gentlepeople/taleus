import { Express } from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions/v2';
import { GlobalOptions } from 'firebase-functions/v2';
import { onRequest } from 'firebase-functions/v2/https';

import { createApiNestServer } from './adapter/in/api/api.bootstrap';
import { createGraphQLNestServer } from './adapter/in/graphql/graphql.bootstrap';

admin.initializeApp();

const firestore = admin.firestore();

firestore.settings({ ignoreUndefinedProperties: true });

// functions global option
const functionsGlobalOptions: GlobalOptions = {
  region: 'asia-northeast3',
  memory: '2GiB',
  minInstances: 1,
  timeoutSeconds: 600,
  vpcConnector: process.env.VPC_CONNECTOR,
  vpcConnectorEgressSettings: 'ALL_TRAFFIC',
};
functions.setGlobalOptions({ ...functionsGlobalOptions });

let graphqlNestServer: Express;

export const graphql = onRequest(async (req, resp) => {
  if (!graphqlNestServer) {
    graphqlNestServer = await createGraphQLNestServer();
  }
  return graphqlNestServer(req, resp);
});

let apiNestServer: Express;

export const api = onRequest(async (req, resp) => {
  if (!apiNestServer) {
    apiNestServer = await createApiNestServer();
  }
  return apiNestServer(req, resp);
});
