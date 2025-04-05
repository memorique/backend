import { Injectable } from '@nestjs/common';
import { CreateOccasionDto } from './dto/create-occasion.dto';
import { UpdateOccasionDto } from './dto/update-occasion.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Occasion } from './entities/occasion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OccasionService {

  constructor(@InjectRepository(Occasion) private readonly occasionRepository: Repository<Occasion>) { }

  create(createOccasionDto: CreateOccasionDto, user: Partial<User>): Promise<Occasion> {
    const { name } = createOccasionDto;
    const occasion = this.occasionRepository.create({
      name, user_id: user.user_id,
      organization_id: user.organization_id
    })
    return this.occasionRepository.save(occasion);
  }

  findAll(user: Partial<User>) {
    return this.occasionRepository.find({ where: { organization_id: user.organization_id, is_active: true } })
  }

  findOne(id: string, user: Partial<User>) {
    return this.occasionRepository.findOne({ where: { occasion_id: id, organization_id: user.organization_id } })
  }

  update(id: string, updateOccasionDto: UpdateOccasionDto, user: Partial<User>) {
    return this.occasionRepository.update({ occasion_id: id, organization_id: user.organization_id }, {
      name: updateOccasionDto.name
    })
  }
}
