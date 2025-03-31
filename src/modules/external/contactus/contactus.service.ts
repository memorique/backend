import { Injectable } from '@nestjs/common';
import { ContactUs } from './contactus.entity';
import { ContactUsRepository } from './contactus.repository';

@Injectable()
export class ContactUsService {
  constructor(private readonly contactUsRepository: ContactUsRepository) {}

  // Create a new ContactUs entry
  async createContactUs(data: Partial<ContactUs>): Promise<ContactUs> {
    return await this.contactUsRepository.createContactUs(data);
  }
}