import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

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
    body: string;

    @IsBoolean()
    is_active: boolean = true;
}
