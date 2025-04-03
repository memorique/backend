import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organizations } from './entities/organization.entity';
import { Address } from './entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Organizations, Address])],
  controllers: [OrganizationController],
  providers: [OrganizationService],
})
export class OrganizationModule {}
