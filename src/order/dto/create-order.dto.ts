import { Type } from "class-transformer";
import { ArrayMinSize, IS_LENGTH, IsArray, isArray, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { RecipientDto } from "./recipient.dto";
import { IsUniqueEmail } from "src/common/validators/recipient-unique-email.validator";
import { SendVia } from "../entities/order.entity";

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

    @IsEnum(SendVia)
    @IsNotEmpty()
    send_via: SendVia;

    @IsArray()
    @ArrayMinSize(1, { message: 'At least one recipient is required' })
    @ValidateNested({ each: true })
    @Type(() => RecipientDto)
    @IsUniqueEmail({ message: 'Email addresses must be unique in the recipient list' })
    recipient_list: RecipientDto[];

}
