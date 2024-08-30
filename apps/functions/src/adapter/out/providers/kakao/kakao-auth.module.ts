import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { KakaoAuthAdapter } from './kakao-auth.adapter';

import { KAKAO_AUTH_PORT } from '@/ports';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://kapi.kakao.com/v2/',
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [
    {
      provide: KAKAO_AUTH_PORT,
      useClass: KakaoAuthAdapter,
    },
  ],
  exports: [KAKAO_AUTH_PORT],
})
export class KakaoAuthModule {}
