import { Module } from '@nestjs/common';

import { AuthServiceModule } from './auth';
import { UserServiceModule } from './user';

import { ProviderModule } from '@/providers';
import { RepositoriesModule } from '@/repositories';

@Module({
  imports: [ProviderModule, RepositoriesModule],
  providers: [UserServiceModule, AuthServiceModule],
  exports: [UserServiceModule, AuthServiceModule],
})
export class ServiceModule {}
