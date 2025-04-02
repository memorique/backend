import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { Organization } from './entities/organization.entity';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  async createOrganization(
    @Body() createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    console.log({ createOrganizationDto });
    return this.organizationService.createOrganization(createOrganizationDto);
  }

  @Get()
  async getOrganizations(): Promise<Organization[]> {
    return this.organizationService.getOrganizations();
  }
}
