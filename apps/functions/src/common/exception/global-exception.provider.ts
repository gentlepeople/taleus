import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { GqlArgumentsHost, GqlContextType, GqlExceptionFilter } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { logger } from 'firebase-functions';
import { GraphQLResolveInfo } from 'graphql';

import { TimeAdapter } from '@/providers';

@Catch()
export class GlobalExceptionProvider implements ExceptionFilter, GqlExceptionFilter {
  private readonly dayjsAdapter: TimeAdapter;

  constructor() {
    this.dayjsAdapter = new TimeAdapter();
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
      };
      logger.error(
        `${request.method} ${request.url}`,
        JSON.stringify(error),
        'ExceptionFilter [REST]',
      );
      return response.status(status).json(error);
    } else if (host.getType<GqlContextType>() === 'graphql') {
      const gqlHost = GqlArgumentsHost.create(host);
      const info = gqlHost.getInfo<GraphQLResolveInfo>();

      // GRAPHQL
      const error = {
        ...errorResponse,
        type: info.parentType,
        field: info.fieldName,
      };

      logger.error(
        `${info.parentType} ${info.fieldName}`,
        JSON.stringify(error),
        'ExceptionFilter [Graphql]',
      );
      return exception;
    }
  }
}
