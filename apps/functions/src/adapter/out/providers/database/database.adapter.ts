import { PrismaClient } from '@gentlepeople/taleus-schema';
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';

import { DatabasePort } from '@/ports';

@Injectable()
export class DatabaseAdapter extends PrismaClient implements OnModuleInit, DatabasePort {
  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
      errorFormat: 'colorless',
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    // this.$on('beforeExit', async () => {
    //   await app.close();
    // });
  }
}
