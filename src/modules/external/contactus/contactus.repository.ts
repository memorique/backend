import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactUs } from './contactus.entity';

@Injectable()
export class ContactUsRepository {
    constructor(
        @InjectRepository(ContactUs) private readonly contactUsRepository: Repository<ContactUs>,
        private readonly dataSource: DataSource
    ) { }

    // Create a new ContactUs entry
    async createContactUs(data: Partial<ContactUs>): Promise<any> {
        const { name, email, gift_volume, usecase, message } = data;
        const query = `CALL create_contactus(?, ?, ?, ?, ?)`;

        // Execute the query and pass parameters
        const result = await this.dataSource.query(query, [
            name,
            email,
            gift_volume,
            usecase,
            message,
        ]);

        return result;
    }
}