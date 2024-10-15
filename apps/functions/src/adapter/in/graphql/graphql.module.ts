import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { DirectiveLocation, GraphQLDirective, GraphQLSchema } from 'graphql';
import { ProviderModule } from 'src/adapter/out/providers';

import * as graphqlResolvers from '.';

import '@/common/enums/register-enum';
import {
  GlobalExceptionProvider,
  LoggerMiddleware,
  upperDirectiveTransformer,
  isLocal,
} from '@/common';
import { ServiceModule } from '@/services';

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
        context: ({ req }) => ({ req }),
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
        plugins: [
          ...(isLocal
            ? [ApolloServerPluginLandingPageLocalDefault()]
            : [
                ApolloServerPluginLandingPageProductionDefault({
                  graphRef: process.env.APOLLO_GRAPH_REF,
                  embed: true,
                }),
              ]),
        ],
      }),
    }),
  ],
  providers: [
    Logger,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionProvider,
    },
    ...Object.values(graphqlResolvers),
  ],
})
export class GraphqlModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
