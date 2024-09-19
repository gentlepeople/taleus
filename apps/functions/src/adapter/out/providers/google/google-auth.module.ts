import { DynamicModule, Module } from '@nestjs/common';

import { GoogleAuthAdapter } from './google-auth.adapter';

import { GOOGLE_AUTH_OPTIONS, GOOGLE_AUTH_PORT, IGoogleAuthOptionType } from '@/ports';

@Module({})
export class GoogleAuthModule {
  static forRootAsync(options: {
    imports?: any[];
    inject?: any[];
    useFactory: (
      ...args: any[]
    ) => Promise<{ option: IGoogleAuthOptionType }> | { option: IGoogleAuthOptionType };
  }): DynamicModule {
    return {
      module: GoogleAuthModule,
      imports: options.imports || [],
      providers: [
        {
          provide: GOOGLE_AUTH_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        {
          provide: GOOGLE_AUTH_PORT,
          inject: [GOOGLE_AUTH_OPTIONS],
          useFactory: async (options: IGoogleAuthOptionType) => new GoogleAuthAdapter(options),
        },
      ],
      exports: [GOOGLE_AUTH_PORT],
    };
  }
}
