import { PartialType } from '@nestjs/mapped-types';
import { CreateEmailTemplateDto } from './create-email-template.dto';

export class UpdateEmailTemplateDto extends PartialType(CreateEmailTemplateDto) {
    occasion_id?: string;
    title?: string;
    subject?: string;
    body?: string;
    is_active?: boolean;
}
