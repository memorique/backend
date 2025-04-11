import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RecipientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  mobile: string;

  @IsString()
  @IsNotEmpty()
  price_id: string;
}