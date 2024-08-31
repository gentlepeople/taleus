import { Global, Module } from '@nestjs/common';

import { PrismaAdapter } from './prisma.adapter';

import { DATABASE_PORT } from '@/ports';

@Global()
@Module({
  providers: [
    {
      provide: DATABASE_PORT,
      useClass: PrismaAdapter,
    },
  ],
  exports: [DATABASE_PORT],
})
export class DatabaseModule {}
