import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Organization } from 'src/organization/entities/organization.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, firstName, lastName, organizationId } =
      createUserDto;

    // Find the organization by ID
    const organization = await this.organizationRepository.findOne({
      where: { organization_id: organizationId },
    });

    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    // Hash the password before saving
    const saltRounds = 10; // Higher value means more security but slower
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User();
    user.name = firstName + ' ' + lastName;
    user.password = hashedPassword;
    user.email = email;
    // user.role = role;
    user.organization = organization;

    return this.usersRepository.save(user);
  }
}
