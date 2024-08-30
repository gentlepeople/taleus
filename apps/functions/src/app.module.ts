import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { DirectiveLocation, GraphQLDirective, GraphQLSchema } from 'graphql';
import { ProviderModule } from 'src/adapter/out/providers';

import * as resolvers from './adapter/in';
import { AuthServiceModule } from './application/services/auth';
import { UserServiceModule } from './application/services/user';

import { GlobalExceptionProvider, LoggerMiddleware, upperDirectiveTransformer } from '@/common';
import { RepositoriesModule } from '@/repositories';

@Module({
  imports: [
    ProviderModule,
    RepositoriesModule,
    UserServiceModule,
    AuthServiceModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => ({
        path: '/',
        sortSchema: true,
        introspection: true,
        autoSchemaFile: true,
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
    ...Object.values(resolvers),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
