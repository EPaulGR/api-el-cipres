import { Test, TestingModule } from '@nestjs/testing';
import { TiposMaderaService } from './tipos-madera.service';

describe('TiposMaderaService', () => {
  let service: TiposMaderaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TiposMaderaService],
    }).compile();

    service = module.get<TiposMaderaService>(TiposMaderaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
