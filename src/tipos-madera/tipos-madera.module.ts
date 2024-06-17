import { Module } from '@nestjs/common';
import { TiposMaderaService } from './tipos-madera.service';
import { TiposMaderaController } from './tipos-madera.controller';

@Module({
  controllers: [TiposMaderaController],
  providers: [TiposMaderaService],
})
export class TiposMaderaModule {}
