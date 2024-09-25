import { Module } from '@nestjs/common';

import { AuthServiceModule } from './auth';
import { MissionServiceModule } from './mission';
import { NotificationServiceModule } from './notification';
import { UserServiceModule } from './user';

const ServiceModules = [
  UserServiceModule,
  AuthServiceModule,
  NotificationServiceModule,
  MissionServiceModule,
];

@Module({
  imports: ServiceModules,
  exports: ServiceModules,
})
export class ServiceModule {}
