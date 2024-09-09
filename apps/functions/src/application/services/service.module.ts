import { Module } from '@nestjs/common';

import { AuthServiceModule } from './auth';
import { MissionServiceModule } from './mission';
import { NotificationServiceModule } from './notification';
import { ScheduleServiceModule } from './schedule';
import { UserServiceModule } from './user';

const ServiceModules = [
  UserServiceModule,
  AuthServiceModule,
  NotificationServiceModule,
  ScheduleServiceModule,
  MissionServiceModule,
];

@Module({
  imports: ServiceModules,
  exports: ServiceModules,
})
export class ServiceModule {}
