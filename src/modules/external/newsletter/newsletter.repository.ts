import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Newsletter } from "./newsletter.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class NewsletterRepository {
    constructor(@InjectRepository(Newsletter) private readonly newsletterRepository: Repository<Newsletter>,
        private readonly dataSource: DataSource) { }

    async create(data: Partial<Newsletter>): Promise<any> {
           const {email} = data;
           const query = `CALL create_newsletter(?)`;
           const result = await this.dataSource.query(query, [email]);
           return result;
       }
}