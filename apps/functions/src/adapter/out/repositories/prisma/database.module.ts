import { Module } from '@nestjs/common';

import { DATABASE_REPOSITORY } from './database.repository';
import { PrismaService } from './prisma.service';

@Module({
  providers: [
    {
      provide: DATABASE_REPOSITORY,
      useClass: PrismaService,
    },
  ],
  exports: [DATABASE_REPOSITORY],
})
export class DatabaseModule {}
