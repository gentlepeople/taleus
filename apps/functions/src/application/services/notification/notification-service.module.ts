import { Module } from '@nestjs/common';

import { UpdateNotificationTimeService } from './update-notification-time.service';

import {
  UPDATE_NOTIFICATION_TIME_USECASE,
  IUserRepository,
  USER_REPOSITORY,
  MESSAGING_PORT,
  MessagingPort,
} from '@/ports';
import { MessagingModule } from '@/providers';
import { UserRepository } from '@/repositories';

const InjectRepositories = [
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository,
  },
];

@Module({
  imports: [MessagingModule],
  providers: [
    ...InjectRepositories,
    {
      inject: [USER_REPOSITORY, MESSAGING_PORT],
      provide: UPDATE_NOTIFICATION_TIME_USECASE,
      useFactory: (userRepository: IUserRepository, messagingPort: MessagingPort) =>
        new UpdateNotificationTimeService(userRepository, messagingPort),
    },
  ],
  exports: [UPDATE_NOTIFICATION_TIME_USECASE],
})
export class NotificationServiceModule {}
