import { Module } from '@nestjs/common';

import { UpdateNotificationTimeService } from './update-notification-time.service';

import {
  UPDATE_NOTIFICATION_TIME_USECASE,
  IUserRepository,
  USER_REPOSITORY,
  PUSH_NOTIFICATION_PORT,
  PushNotificationPort,
} from '@/ports';
import { PushNotificationModule } from '@/providers';
import { UserRepository } from '@/repositories';

const InjectRepositories = [
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository,
  },
];

@Module({
  imports: [PushNotificationModule],
  providers: [
    ...InjectRepositories,
    {
      inject: [USER_REPOSITORY, PUSH_NOTIFICATION_PORT],
      provide: UPDATE_NOTIFICATION_TIME_USECASE,
      useFactory: (userRepository: IUserRepository, pushNotificationPort: PushNotificationPort) =>
        new UpdateNotificationTimeService(userRepository, pushNotificationPort),
    },
  ],
  exports: [UPDATE_NOTIFICATION_TIME_USECASE],
})
export class NotificationServiceModule {}
