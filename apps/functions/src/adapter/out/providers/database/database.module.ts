import { Global, Module } from '@nestjs/common';

import { DatabaseAdapter } from './database.adapter';

import { DATABASE_PORT } from '@/ports';

@Global()
@Module({
  providers: [
    {
      provide: DATABASE_PORT,
      useClass: DatabaseAdapter,
    },
  ],
  exports: [DATABASE_PORT],
})
export class DatabaseModule {}
