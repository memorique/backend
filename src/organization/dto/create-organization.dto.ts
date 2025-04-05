import { IsEmail, IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  @IsNotEmpty({ message: 'Organization name is required' })
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  contactEmail: string;

}
