import { Test, TestingModule } from '@nestjs/testing';
import { AccController } from './acc.controller';
import { AccService } from './acc.service';

describe('AccController', () => {
  let controller: AccController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccController],
      providers: [AccService],
    }).compile();

    controller = module.get<AccController>(AccController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
