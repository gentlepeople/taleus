import { ExceptionFilter, HttpException, ArgumentsHost, HttpStatus, Catch } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { logger } from 'firebase-functions';
import { GraphQLResolveInfo } from 'graphql';

import { DayjsService } from '@/providers';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter, GqlExceptionFilter {
  private readonly timeService = new DayjsService();
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const gqlHost = GqlArgumentsHost.create(host);
    const info = gqlHost.getInfo<GraphQLResolveInfo>();

    const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      statusCode: status,
      timestamp: this.timeService.format({
        template: 'YYYY년 MM월 DD일 HH시 mm분',
      }),
      message: exception?.message,
      name: exception?.name,
    };

    // REST
    if (request) {
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
      return response.status(status).json(errorResponse);
    } else {
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
