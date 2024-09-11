import { INestApplication } from '@nestjs/common';
import { Express } from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions/v2';
import { GlobalOptions } from 'firebase-functions/v2';
import { onRequest } from 'firebase-functions/v2/https';

import { createGraphQLNestServer } from './app.bootstrap';

admin.initializeApp();

const firestore = admin.firestore();

firestore.settings({ ignoreUndefinedProperties: true });

// functions global option
const functionsGlobalOptions: GlobalOptions = {
  region: 'asia-northeast3',
  memory: '2GiB',
  minInstances: 0,
  timeoutSeconds: 600,
  vpcConnector: process.env.VPC_CONNECTOR,
  vpcConnectorEgressSettings: 'ALL_TRAFFIC',
};
functions.setGlobalOptions({ ...functionsGlobalOptions });

let graphqlNestServer: Express;
let nestAppContext: INestApplication;

export const graphql = onRequest(async (req, resp) => {
  if (!graphqlNestServer) {
    const { express, app } = await createGraphQLNestServer();
    graphqlNestServer = express;
    nestAppContext = app;
  }
  return graphqlNestServer(req, resp);
});

// export const schedule = functions.scheduler.onSchedule('* * * * * *', async (context) => {
//   if (!graphqlNestServer) {
//     const { express, app } = await createGraphQLNestServer();
//     graphqlNestServer = express;
//     nestAppContext = app;
//   }

//   const scheduleDailyMissionService = nestAppContext.get(ScheduleDailyMissionService);
//   await scheduleDailyMissionService.execute();
// });
