import { Injectable } from '@nestjs/common';
import { configDotenv } from 'dotenv';
import config from './config';

configDotenv();

@Injectable()
export class SharedConfigService {
  public getConfig() {
    return {
      env: process.env,
      ...config,
    };
  }
}
