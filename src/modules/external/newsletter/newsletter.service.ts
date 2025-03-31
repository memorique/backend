import { Injectable } from '@nestjs/common';
import { CreateNewsletterDto } from './create-newsletter.dto';
import { NewsletterRepository } from './newsletter.repository';
import { Newsletter } from './newsletter.entity';

@Injectable()
export class NewsletterService {

  constructor(private readonly newsletterRepositpry: NewsletterRepository){}
  
  create(createNewsletterDto: CreateNewsletterDto): Promise<Newsletter> {
    return this.newsletterRepositpry.create(createNewsletterDto);
  }
}
