import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ProviderModule } from 'src/adapter/out/providers';

import '@/common/enums/register-enum';

import { EventModule, WebhookModule } from '.';

import { GlobalExceptionProvider, LoggerMiddleware } from '@/common';

@Module({
  imports: [ProviderModule, EventModule, WebhookModule],
  providers: [
    Logger,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionProvider,
    },
  ],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
