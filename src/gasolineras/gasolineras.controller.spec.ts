import { Test, TestingModule } from '@nestjs/testing';
import { GasolinerasController } from './gasolineras.controller';
import { GasolinerasService } from './gasolineras.service';

describe('GasolinerasController', () => {
  let controller: GasolinerasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GasolinerasController],
      providers: [GasolinerasService],
    }).compile();

    controller = module.get<GasolinerasController>(GasolinerasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
