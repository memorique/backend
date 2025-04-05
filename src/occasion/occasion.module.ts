import { Module } from '@nestjs/common';
import { OccasionService } from './occasion.service';
import { OccasionController } from './occasion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Occasion } from './entities/occasion.entity';

@Module({
  controllers: [OccasionController],
  providers: [OccasionService],
  imports:[TypeOrmModule.forFeature([Occasion])]
})
export class OccasionModule {}
