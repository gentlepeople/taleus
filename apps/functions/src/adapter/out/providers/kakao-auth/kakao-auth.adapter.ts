import { AuthenticationError } from '@nestjs/apollo';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map } from 'rxjs';

import { sampleKakaoAccount } from './kakao-auth.const';

import { IKakaoAuthPortUserAccountType, KakaoAuthPort } from '@/ports';

@Injectable()
export class KakaoAuthAdapter implements KakaoAuthPort {
  constructor(private httpService: HttpService) {}

  public async getUserAccount(accessToken: string): Promise<IKakaoAuthPortUserAccountType> {
    try {
      if (accessToken === process.env.KAKAO_SAMPLE_ACCESS_TOKEN) {
        return sampleKakaoAccount;
      }

      const kakaoAccount: IKakaoAuthPortUserAccountType = await lastValueFrom(
        this.httpService
          .get('user/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
          })
          .pipe(map((response: AxiosResponse) => response.data)),
      );

      return kakaoAccount;
    } catch (e: any) {
      throw new AuthenticationError(`Error in KakaoAuthAdapter:getUserAccount: ${e.code} ${e}`);
    }
  }
}
