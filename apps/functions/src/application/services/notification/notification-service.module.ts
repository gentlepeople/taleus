import { Module } from '@nestjs/common';

import { UpdateNotificationTimeService } from './update-notification-time.service';

import { UPDATE_NOTIFICATION_TIME_USECASE, IUserRepository, USER_REPOSITORY } from '@/ports';
import { PubSubModule } from '@/providers';
import { UserRepository } from '@/repositories';

const InjectRepositories = [
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository,
  },
];

@Module({
  imports: [PubSubModule],
  providers: [
    ...InjectRepositories,
    {
      inject: [USER_REPOSITORY],
      provide: UPDATE_NOTIFICATION_TIME_USECASE,
      useFactory: (userRepository: IUserRepository) =>
        new UpdateNotificationTimeService(userRepository),
    },
  ],
  exports: [UPDATE_NOTIFICATION_TIME_USECASE],
})
export class NotificationServiceModule {}
