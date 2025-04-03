import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { Organizations } from './entities/organization.entity';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  async createOrganization(
    @Body() createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organizations> {
    console.log({ createOrganizationDto });
    return this.organizationService.createOrganization(createOrganizationDto);
  }

  @Get()
  async getOrganizations(): Promise<Organizations[]> {
    return this.organizationService.getOrganizations();
  }
}
