import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {  UserSchema } from './schemas/user.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), AuthModule ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}