import { Type } from "class-transformer";
import { ArrayMinSize, IS_LENGTH, IsArray, isArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { RecipientDto } from "./recipient.dto";
import { IsUniqueEmail } from "src/common/validators/recipient-unique-email.validator";

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    occasion_id: string;

    @IsString()
    @IsNotEmpty()
    email_template_id: string;

    @IsString()
    @IsNotEmpty()
    email_template_body: string;

    @IsArray()
    @ArrayMinSize(1, { message: 'At least one recipient is required' })
    @ValidateNested({ each: true })
    @Type(() => RecipientDto)
    @IsUniqueEmail({ message: 'Email addresses must be unique in the recipient list' })
    recipient_list: RecipientDto[];

}
