import { IsBoolean, IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import { ContainsGiftLinkConstraint } from 'src/common/validators/contains-gift-link';

export class CreateEmailTemplateDto {
    @IsString()
    @IsNotEmpty()
    occasion_id: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    subject: string;

    @IsString()
    @IsNotEmpty()
    @Validate(ContainsGiftLinkConstraint)
    body: string;

    @IsBoolean()
    @IsOptional()
    is_active: boolean = true;
}
