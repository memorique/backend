import { Controller, Post, Body } from '@nestjs/common';
import { CreateContactUsDto } from './contactus.dto';
import { ContactUsService } from './contactus.service';
import { EmailService } from 'src/common/services/email.service';

@Controller('contactus')
export class ContactUsController {
  constructor(private readonly contactUsService: ContactUsService, private readonly emailService: EmailService) { }

  // Create a new ContactUs entry
  @Post("create")
  async create(@Body() contactData: CreateContactUsDto) {
    const result = await this.contactUsService.createContactUs(contactData);

    const html = "<p>You have received a new inquiry from the Contact Us page on your website. Below are the details:<p>\
    <p>Name: "+ contactData.name + "</p>\
    <p>email: "+ contactData.email + "</p>\
    <p>Gift Volume: "+ contactData.gift_volume + "</p>\
    <p>Usecase: "+ contactData.usecase + "</p>\
    <p>Message: "+ contactData.message + "</p>"

    const mailOptions = {
      to: "Memorique<hello@memorique.com>",
      subject: "New Contact Form Submission from website",
      html: html,
    };

    this.emailService.send(mailOptions);

  }
}