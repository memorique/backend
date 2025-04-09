import { Module } from '@nestjs/common';
import { StripService } from './strip.service';
import { StripController } from './strip.controller';

@Module({
  controllers: [StripController],
  providers: [StripService],
})
export class StripModule {}
