import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { DirectiveLocation, GraphQLDirective, GraphQLSchema } from 'graphql';
import { ProviderModule } from 'src/adapter/out/providers';

import * as resolvers from './adapter/in';
import { ServiceModule } from './application/services';

import {
  AuthGuard,
  GlobalExceptionProvider,
  LoggerMiddleware,
  upperDirectiveTransformer,
} from '@/common';

@Module({
  imports: [
    ProviderModule,
    ServiceModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => ({
        path: '/',
        sortSchema: true,
        introspection: true,
        autoSchemaFile: true,
        // subscriptions: {
        //   'graphql-ws': true,
        // },
        transformSchema: (schema: GraphQLSchema) => upperDirectiveTransformer(schema, 'upper'),
        playground: false,
        buildSchemaOptions: {
          numberScalarMode: 'integer',
          directives: [
            new GraphQLDirective({
              name: 'upper',
              locations: [DirectiveLocation.FIELD_DEFINITION],
            }),
          ],
        },
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
      }),
    }),
  ],
  providers: [
    Logger,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionProvider,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    ...Object.values(resolvers),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
