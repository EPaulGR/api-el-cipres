import { Test, TestingModule } from '@nestjs/testing';
import { MedidasMaderaService } from './medidas-madera.service';

describe('MedidasMaderaService', () => {
  let service: MedidasMaderaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedidasMaderaService],
    }).compile();

    service = module.get<MedidasMaderaService>(MedidasMaderaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
