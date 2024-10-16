import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ConfigPort } from '@/ports';

@Injectable()
export class ConfigAdapter implements ConfigPort {
  constructor(private readonly configService: ConfigService) {}
  public get(configType: string): string {
    return this.configService.get(configType.toString());
  }

  public get isDevelopment(): boolean {
    return this.configService.get('NODE_ENV') === 'local';
  }
}
