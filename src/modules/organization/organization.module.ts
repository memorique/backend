import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { OrganizationSchema } from './organization.schema';
import { OrganizationService } from './organization.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Organization', schema: OrganizationSchema }]), AuthModule],
  controllers: [],
  providers: [OrganizationService],
  exports: [OrganizationService],
})
export class OrganizationModule { }