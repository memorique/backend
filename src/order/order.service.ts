import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { HashService } from 'src/common/utils/hash';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private readonly orderRepository: Repository<Order>, private hashService: HashService) { }
  async create(createOrderDto: CreateOrderDto, user: Partial<User>) {
    const createdOrders: Order[] = [];
    const { recipient_list, occasion_id, email_template_id, email_template_body, send_via } = createOrderDto;

    for (let recipient of recipient_list) {
      const newOrder = this.orderRepository.create({
        user_id: user.user_id,
        occasion_id,
        email_template_id,
        email_template_body,
        name: recipient.name,
        email: recipient.email,
        price_id: recipient.price_id,
        send_via
      });

      const savedOrder = await this.orderRepository.save(newOrder);
      const order_hash = this.hashService.encodeOrderHash(savedOrder.order_number);
      savedOrder.order_hash = order_hash;
      savedOrder.order_url = `https://memorique.com/gift/${order_hash}`;
      await this.orderRepository.save(savedOrder);
      createdOrders.push(savedOrder);
    }
    return createdOrders;
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
