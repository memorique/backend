import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOccasionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsBoolean()
  @IsOptional()
  is_active: boolean = true;
}
