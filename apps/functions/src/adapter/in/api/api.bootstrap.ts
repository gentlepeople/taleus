import {
  INestApplication,
  LogLevel,
  LoggerService,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';
import { NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Express } from 'express';
import { logger as firebaseLogger } from 'firebase-functions/v2';
import { Logger } from 'nestjs-pino';

import { ApiModule } from './api.module';

import { GlobalExceptionProvider, isEmulator } from '@/common';

export const createApiNestServer = async (): Promise<Express> => {
  const expressInstance = express();
  let app: INestApplication;
  try {
    // express application
    const expressAdapter = new ExpressAdapter(expressInstance);
    const defaultExpressApplicationProvider: NestApplicationOptions = {
      bufferLogs: true,
    };
    app = await NestFactory.create(ApiModule, expressAdapter, defaultExpressApplicationProvider);

    // logger
    const loggerOptions: {
      logger?: LoggerService | LogLevel[] | false;
    } = {};
    const defaultLogger = app.get(Logger);
    const { logger = defaultLogger } = loggerOptions;
    app.useLogger(logger);

    // global filter
    app.useGlobalFilters(new GlobalExceptionProvider());

    // validation pipe
    const validationPipeOptions: ValidationPipeOptions = {
      enableDebugMessages: isEmulator,
      skipUndefinedProperties: false,
      skipNullProperties: false,
      skipMissingProperties: false,
      whitelist: false,
      forbidNonWhitelisted: true,
      disableErrorMessages: false,
      errorHttpStatusCode: 400,
      always: true,
      dismissDefaultMessages: false,
      stopAtFirstError: false,
      transform: true,
    };
    app.useGlobalPipes(new ValidationPipe({ ...validationPipeOptions }));

    await app.init();
    firebaseLogger.log('Nest Ready (taleus-api)');
  } catch (err) {
    firebaseLogger.error('Nest broken (taleus-api)', err);
  }
  return expressInstance;
};
