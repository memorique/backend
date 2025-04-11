import { Injectable } from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { Price } from './entities/price.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PriceService {

  constructor(@InjectRepository(Price) private readonly priceRepository: Repository<Price>) { }

  create(createPriceDto: CreatePriceDto, user: Partial<User>) {
    const { order_price, shipping_price, processing_fee, } = createPriceDto;
    const price = this.priceRepository.create({
      organization_id: user.organization_id,
      order_price,
      shipping_price,
      processing_fee,
    });
    console.log("price", price);
    return this.priceRepository.save(price);
  }

  findAll(user: Partial<User>) {
    return this.priceRepository.find({ where: { organization_id: user.organization_id, is_delete:false } })
  }

  findOne(id: number) {
    return `This action returns a #${id} price`;
  }

  update(id: number, updatePriceDto: UpdatePriceDto) {
    return `This action updates a #${id} price`;
  }

  remove(id: number) {
    return `This action removes a #${id} price`;
  }
}
