import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly appService: ConfigService) {}

  @Get()
  getHello(): string {
    // config 서비스 사용
    return this.ConfigService.get('MESSAGE')as string;
  }
}
