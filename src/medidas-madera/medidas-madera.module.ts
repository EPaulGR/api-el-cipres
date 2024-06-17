import { Module } from '@nestjs/common';
import { MedidasMaderaService } from './medidas-madera.service';
import { MedidasMaderaController } from './medidas-madera.controller';

@Module({
  controllers: [MedidasMaderaController],
  providers: [MedidasMaderaService],
})
export class MedidasMaderaModule {}
