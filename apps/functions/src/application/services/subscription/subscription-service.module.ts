import { Module } from '@nestjs/common';

import { AnalyticsModule } from '../../../adapter/out';

import { SyncSubscriptionStatusService } from './sync-subscription-status.service';

import {
  USER_REPOSITORY,
  IUserRepository,
  SYNC_SUBSCRIPTION_STATUS_USECASE,
  ANALYTICS_PORT,
  AnalyticsPort,
} from '@/ports';
import { UserRepository } from '@/repositories';

const InjectRepositories = [
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository,
  },
];

@Module({
  imports: [AnalyticsModule],
  providers: [
    ...InjectRepositories,
    {
      inject: [USER_REPOSITORY, ANALYTICS_PORT],
      provide: SYNC_SUBSCRIPTION_STATUS_USECASE,
      useFactory: (userRepository: IUserRepository, analyticsPort: AnalyticsPort) =>
        new SyncSubscriptionStatusService(userRepository, analyticsPort),
    },
  ],
  exports: [SYNC_SUBSCRIPTION_STATUS_USECASE],
})
export class SubscriptionServiceModule {}
