import { Test, TestingModule } from '@nestjs/testing';
import { TiposMaderaController } from './tipos-madera.controller';
import { TiposMaderaService } from './tipos-madera.service';

describe('TiposMaderaController', () => {
  let controller: TiposMaderaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TiposMaderaController],
      providers: [TiposMaderaService],
    }).compile();

    controller = module.get<TiposMaderaController>(TiposMaderaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
