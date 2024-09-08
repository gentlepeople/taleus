import { Module } from '@nestjs/common';

import { AuthServiceModule } from './auth';
import { NotificationServiceModule } from './notification';
import { UserServiceModule } from './user';

const ServiceModules = [UserServiceModule, AuthServiceModule, NotificationServiceModule];

@Module({
  imports: ServiceModules,
  exports: ServiceModules,
})
export class ServiceModule {}
