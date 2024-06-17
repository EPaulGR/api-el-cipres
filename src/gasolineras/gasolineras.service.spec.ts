import { Test, TestingModule } from '@nestjs/testing';
import { GasolinerasService } from './gasolineras.service';

describe('GasolinerasService', () => {
  let service: GasolinerasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GasolinerasService],
    }).compile();

    service = module.get<GasolinerasService>(GasolinerasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
