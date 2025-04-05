import { Injectable } from '@nestjs/common';
import { CreateEmailTemplateDto } from './dto/create-email-template.dto';
import { UpdateEmailTemplateDto } from './dto/update-email-template.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailTemplate } from './entities/email-template.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmailTemplateService {
  constructor(@InjectRepository(EmailTemplate) private readonly emailTemplateRepository: Repository<EmailTemplate>) {

  }
  create(createEmailTemplateDto: CreateEmailTemplateDto, user: Partial<User>) {
    const { occasion_id, title, subject, body } = createEmailTemplateDto;
    const emailTemplate = this.emailTemplateRepository.create({
      occasion_id,
      title,
      subject,
      body,
      user_id: user.user_id,
      organization_id: user.organization_id
    });

    return this.emailTemplateRepository.save(emailTemplate);
  }

  findAll(user: Partial<User>) {
    return this.emailTemplateRepository.find({ where: { organization_id: user.organization_id, is_delete: false } });
  }

  findOne(id: string, user: Partial<User>) {
    return this.emailTemplateRepository.findOne({ where: { email_template_id: id, organization_id: user.organization_id, is_delete: false } })
  }

  update(id: string, updateEmailTemplateDto: UpdateEmailTemplateDto, user: Partial<User>) {
    return this.emailTemplateRepository.update({ email_template_id: id, organization_id: user.organization_id, user_id: user.user_id }, updateEmailTemplateDto)
  }

  remove(id: string, user: Partial<User>) {
    return this.emailTemplateRepository.update({ email_template_id: id, organization_id: user.organization_id, user_id: user.user_id }, {
      is_delete: true
    })
  }
}
