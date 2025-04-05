import {  IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateOccasionDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsBoolean()
    is_active: boolean = true;
}
