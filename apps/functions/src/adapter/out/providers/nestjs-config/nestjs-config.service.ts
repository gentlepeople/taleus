import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IConfigPort } from '@/ports';

@Injectable()
export class NestjsConfigService implements IConfigPort {
  constructor(private readonly configService: ConfigService) {}
  public get(configType: string) {
    return this.configService.get(configType.toString());
  }

  public get isDevelopment(): boolean {
    return this.configService.get('ENVIRONMENT') === 'local';
  }
}
