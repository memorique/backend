import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOccasionDto } from './dto/create-occasion.dto';
import { UpdateOccasionDto } from './dto/update-occasion.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Occasion } from './entities/occasion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OccasionService {
  constructor(
    @InjectRepository(Occasion)
    private readonly occasionRepository: Repository<Occasion>,
  ) {}

  create(
    createOccasionDto: CreateOccasionDto,
    user: Partial<User>,
  ): Promise<Occasion> {
    const { name } = createOccasionDto;
    const occasion = this.occasionRepository.create({
      name,
      user_id: user.user_id,
      organization_id: user.organization_id,
    });
    return this.occasionRepository.save(occasion);
  }

  findAll(user: Partial<User>) {
    return this.occasionRepository.find({
      where: {
        organization_id: user.organization_id,
        is_active: true,
        user_id: user.user_id,
      },
    });
  }

  findOne(id: string, user: Partial<User>) {
    return this.occasionRepository.findOne({
      where: { occasion_id: id, organization_id: user.organization_id },
    });
  }

  update(
    id: string,
    updateOccasionDto: UpdateOccasionDto,
    user: Partial<User>,
  ) {
    return this.occasionRepository.update(
      { occasion_id: id, organization_id: user.organization_id },
      {
        name: updateOccasionDto.name,
      },
    );
  }

  async delete(id: any, user_id: string) {
    const result = await this.occasionRepository.update(
      { occasion_id: id, user_id },
      { is_active: false },
    );

    if (result.affected === 0) {
      throw new HttpException(
        'Occasion not found or you do not have permission to update it',
        HttpStatus.BAD_REQUEST,
      );
    }

    console.log(result);
    return result;
  }
}
