import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Organizations } from './entities/organization.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organizations)
    private readonly organizationRepository: Repository<Organizations>,
  ) {}

  async createOrganization(
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organizations> {
    const { name, contactEmail, contactPhone } = createOrganizationDto;

    const organization = this.organizationRepository.create({
      name,
      contactEmail,
      contactPhone,
    });

    return this.organizationRepository.save(organization);
  }

  async getOrganizations(): Promise<Organizations[]> {
    return this.organizationRepository.find();
  }
}
