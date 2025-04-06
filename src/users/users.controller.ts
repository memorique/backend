import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { get } from 'http';
import { User } from './entities/user.entity';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('settings')
  getSettings(@Req() request: Request & { user: Partial<User> }) {
    const user = request.user;
    return this.usersService.getSettings(user);
  }
}
