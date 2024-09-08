import { Module } from '@nestjs/common';

import { AuthServiceModule } from './auth';
import { NotificationServiceModule } from './notification';
import { ScheduleServiceModule } from './schedule';
import { UserServiceModule } from './user';

const ServiceModules = [
  UserServiceModule,
  AuthServiceModule,
  NotificationServiceModule,
  ScheduleServiceModule,
];

@Module({
  imports: ServiceModules,
  exports: ServiceModules,
})
export class ServiceModule {}
