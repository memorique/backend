import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/test")
  getHello1(): string {
    return this.appService.getHello();
  }
  @Post("")
  registerUser(){
    
  }
}
