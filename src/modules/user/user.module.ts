import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {  UserSchema } from './user.schema';
import { AuthModule } from '../auth/auth.module';
import { PriceModule } from '../price/price.module';
import { ConfigurationModule } from '../configuration/configuration.module';
import { OrganizationModule } from '../organization/organization.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), AuthModule, PriceModule, ConfigurationModule,OrganizationModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}