import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashService } from 'src/common/utils/hash';

@Module({
  controllers: [OrderController],
  providers: [OrderService, HashService],
  imports: [TypeOrmModule.forFeature([Order])]
})
export class OrderModule { }
