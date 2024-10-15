import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { GqlArgumentsHost, GqlContextType, GqlExceptionFilter } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { logger } from 'firebase-functions';
import { GraphQLResolveInfo } from 'graphql';

import { SystemNotificationPort } from '../../application/ports';

import {
  EnumSystemNotificationMessageTarget,
  SystemNotificationAdapter,
  TimeAdapter,
} from '@/providers';

@Catch()
export class GlobalExceptionProvider implements ExceptionFilter, GqlExceptionFilter {
  private readonly dayjsAdapter: TimeAdapter;
  private readonly systemNotificationAdapter: SystemNotificationPort;

  constructor() {
    this.dayjsAdapter = new TimeAdapter();
    this.systemNotificationAdapter = new SystemNotificationAdapter();
  }

  private getSystemNotificationPrefixTitle(userAgent: string): string {
    const checkAdminUserAgent =
      userAgent.includes('Chrome') || userAgent.includes('PostmanRuntime');
    return checkAdminUserAgent ? '🚧 TESTING:' : '🚨';
  }

  async catch(exception: any, host: ArgumentsHost) {
    const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      statusCode: status,
      timestamp: this.dayjsAdapter.dayjs().format('YYYY년 MM월 DD일 HH시 mm분'),
      message: exception?.message,
      name: exception?.name,
    };

    // REST
    if (host.getType() === 'http') {
      const ctx = host.switchToHttp();
      const request = ctx.getRequest<Request>();
      const response = ctx.getResponse<Response>();

      const error = {
        ...errorResponse,
        path: request.url,
        method: request.method,
        headers: request.headers,
        body: request.body,
        query: request.query,
        params: request.params,
      };

      logger.error(
        `${request.method} ${request.url}`,
        JSON.stringify(error),
        'ExceptionFilter [REST]',
      );

      const userAgent = request.headers['user-agent'];
      const errorPrefixTitle = this.getSystemNotificationPrefixTitle(userAgent);

      await this.systemNotificationAdapter.send({
        target: EnumSystemNotificationMessageTarget.CRASH,
        content: {
          text: `${errorPrefixTitle} *[HTTP ERROR]*`,
          status: 'ERROR',
          title: `${errorPrefixTitle} ${String(error.message)}`,
          data: Object.entries(error).map(([key, value]) => ({
            dataTitle: key,
            dataDescription: String(value).substring(0, 200),
          })),
        },
      });
      return response.status(status).json(error);
    } else if (host.getType<GqlContextType>() === 'graphql') {
      const gqlHost = GqlArgumentsHost.create(host);
      const info = gqlHost.getInfo<GraphQLResolveInfo>();
      // GRAPHQL
      const error = {
        ...errorResponse,
        type: info.parentType,
        field: info.fieldName,
        variables: JSON.stringify(info.variableValues, (_, value) =>
          typeof value === 'bigint' ? value.toString() : value,
        ),
      };

      logger.error(
        `${info.parentType} ${info.fieldName}`,
        JSON.stringify(error),
        'ExceptionFilter [Graphql]',
      );

      const userAgent = gqlHost.getContext().req.headers['user-agent'];

      const errorPrefixTitle = this.getSystemNotificationPrefixTitle(userAgent);

      await this.systemNotificationAdapter.send({
        target: EnumSystemNotificationMessageTarget.CRASH,
        content: {
          text: `${errorPrefixTitle} *[GRAPHQL ERROR]*`,
          status: 'ERROR',
          title: `${errorPrefixTitle} ${String(error.message)}`,
          data: Object.entries(error).map(([key, value]) => ({
            dataTitle: key,
            dataDescription: String(value),
          })),
        },
      });
      return exception;
    }
  }
}
