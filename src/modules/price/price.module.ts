import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { PriceSchema } from './price.schema';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Price', schema: PriceSchema }]), AuthModule],
  controllers: [PriceController],
  providers: [PriceService],
  exports: [PriceService],
})
export class PriceModule { }