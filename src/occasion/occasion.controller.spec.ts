import { Test, TestingModule } from '@nestjs/testing';
import { OccasionController } from './occasion.controller';
import { OccasionService } from './occasion.service';

describe('OccasionController', () => {
  let controller: OccasionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OccasionController],
      providers: [OccasionService],
    }).compile();

    controller = module.get<OccasionController>(OccasionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
