import { LogLevel, LoggerService, ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Express } from 'express';
import { logger as firebaseLogger } from 'firebase-functions/v2';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';

import { GlobalExceptionProvider } from '@/common';

export const createGraphQLNestServer = async (): Promise<Express> => {
  const expressInstance = express();
  try {
    // express application
    const expressAdapter = new ExpressAdapter(expressInstance);
    const defaultExpressApplicationProvider: NestApplicationOptions = {
      bufferLogs: true,
    };
    const app = await NestFactory.create(
      AppModule,
      expressAdapter,
      defaultExpressApplicationProvider,
    );

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
      enableDebugMessages: Boolean(true),
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

    // const prisma: PrismaAdapter = app.get(PrismaAdapter);
    // await prisma.enableShutdownHooks(app);

    await app.init();
    firebaseLogger.log('Nest Ready (taleus-graphql)');
  } catch (err) {
    firebaseLogger.error('Nest broken (taleus-graphql)', err);
  }
  return expressInstance;
};
