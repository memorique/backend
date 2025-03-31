import { IsString, IsEmail, IsInt, Min, Max, IsUUID, IsNotEmpty } from 'class-validator';

export class CreateContactUsDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  gift_volume: string; 

  @IsString()
  @IsNotEmpty()
  usecase: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}