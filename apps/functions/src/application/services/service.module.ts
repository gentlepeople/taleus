import { Module } from '@nestjs/common';

import { AuthServiceModule } from './auth';
import { UserServiceModule } from './user';

@Module({
  imports: [UserServiceModule, AuthServiceModule],
  exports: [UserServiceModule, AuthServiceModule],
})
export class ServiceModule {}
