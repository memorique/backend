import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Module({
  imports: [ TypeOrmModule.forFeature([User, UserRepository]),AuthModule],
  controllers: [UserController],
  providers: [UserService,UserRepository],
  exports: [UserService],
})
export class UserModule {}