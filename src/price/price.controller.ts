import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { PriceService } from './price.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('price')
@UseGuards(JwtAuthGuard)
export class PriceController {
  constructor(private readonly priceService: PriceService) { }

  @Post("create")
  create(@Body() createPriceDto: CreatePriceDto, @Req() request: Request & { user: Partial<User> }) {
    const user = request.user;
    return this.priceService.create(createPriceDto, user);
  }

  @Get("list")
  findAll(@Req() request: Request & { user: Partial<User> }) {
    const user = request.user;
    return this.priceService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.priceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePriceDto: UpdatePriceDto) {
    return this.priceService.update(+id, updatePriceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.priceService.remove(+id);
  }
}
