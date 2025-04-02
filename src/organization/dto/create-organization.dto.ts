import { IsEmail, IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  @IsNotEmpty({ message: 'Organization name is required' })
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  contactEmail: string;

  @IsString()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Invalid phone number format (Use E.164 format like +1234567890)',
  })
  contactPhone: string;
}
