import { Module } from '@nestjs/common';
import { GasolinerasService } from './gasolineras.service';
import { GasolinerasController } from './gasolineras.controller';

@Module({
  controllers: [GasolinerasController],
  providers: [GasolinerasService],
})
export class GasolinerasModule {}
