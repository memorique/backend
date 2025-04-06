import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { OccasionService } from './occasion.service';
import { CreateOccasionDto } from './dto/create-occasion.dto';
import { UpdateOccasionDto } from './dto/update-occasion.dto';
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('occasion')
@UseGuards(JwtAuthGuard)
export class OccasionController {
  constructor(private readonly occasionService: OccasionService) {}

  @Post('create')
  create(
    @Body() createOccasionDto: CreateOccasionDto,
    @Req() request: Request & { user: Partial<User> },
  ) {
    const user = request.user;
    return this.occasionService.create(createOccasionDto, user);
  }

  @Get('list')
  findAll(@Req() request: Request & { user: Partial<User> }) {
    const user = request.user;
    return this.occasionService.findAll(user);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Req() request: Request & { user: Partial<User> },
  ) {
    const user = request.user;
    return this.occasionService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOccasionDto: UpdateOccasionDto,
    @Req() request: Request & { user: Partial<User> },
  ) {
    const user = request.user;
    return this.occasionService.update(id, updateOccasionDto, user);
  }

  @Delete(':id')
  delete(
    @Param('id') id: string,
    @Req() request: Request & { user: Partial<User> },
  ) {
    const user = request.user;
    return this.occasionService.delete(id, user.user_id);
  }
}
