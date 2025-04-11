import { Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';
import { Price } from './entities/price.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PriceController],
  providers: [PriceService],
  imports: [TypeOrmModule.forFeature([Price])]
})
export class PriceModule { }
