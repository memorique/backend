import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  async createOrganization(
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    const { name, contactEmail } = createOrganizationDto;

    const organization = this.organizationRepository.create({
      name,
      contactEmail,
    });

    return this.organizationRepository.save(organization);
  }

  async getOrganizations(): Promise<Organization[]> {
    return this.organizationRepository.find();
  }
}
