import { Test, TestingModule } from '@nestjs/testing';
import { MedidasMaderaController } from './medidas-madera.controller';
import { MedidasMaderaService } from './medidas-madera.service';

describe('MedidasMaderaController', () => {
  let controller: MedidasMaderaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedidasMaderaController],
      providers: [MedidasMaderaService],
    }).compile();

    controller = module.get<MedidasMaderaController>(MedidasMaderaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
