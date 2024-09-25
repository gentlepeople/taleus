import { Module } from '@nestjs/common';

import { SyncSubscriptionStatusService } from './sync-subscription-status.service';

import { USER_REPOSITORY, IUserRepository, SYNC_SUBSCRIPTION_STATUS_USECASE } from '@/ports';
import { UserRepository } from '@/repositories';

const InjectRepositories = [
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository,
  },
];

@Module({
  providers: [
    ...InjectRepositories,
    {
      inject: [USER_REPOSITORY],
      provide: SYNC_SUBSCRIPTION_STATUS_USECASE,
      useFactory: (userRepository: IUserRepository) =>
        new SyncSubscriptionStatusService(userRepository),
    },
  ],
  exports: [SYNC_SUBSCRIPTION_STATUS_USECASE],
})
export class SubscriptionServiceModule {}
