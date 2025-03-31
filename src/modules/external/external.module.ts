import { Module } from '@nestjs/common';
import { ContactUsController } from './contactus/contactus.controller';
import { ContactUsService } from './contactus/contactus.service';
import { ContactUsRepository } from './contactus/contactus.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactUs } from './contactus/contactus.entity';
import { EmailService } from 'src/common/services/email.service';
import { NewsletterService } from './newsletter/newsletter.service';
import { NewsletterRepository } from './newsletter/newsletter.repository';
import { NewsletterController } from './newsletter/newsletter.controller';
import { Newsletter } from './newsletter/newsletter.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ContactUs]),TypeOrmModule.forFeature([Newsletter])],
    controllers: [ContactUsController, NewsletterController ],
    providers: [ContactUsService, ContactUsRepository, EmailService, NewsletterService, NewsletterRepository],
    exports: [],
})
export class ExternalModule { }