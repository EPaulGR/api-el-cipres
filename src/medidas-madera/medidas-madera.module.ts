import { Module } from '@nestjs/common';
import { MedidasMaderaService } from './medidas-madera.service';
import { MedidasMaderaController } from './medidas-madera.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MedidaMaderaSchema,
  MedidasMadera,
} from './entities/medidas-madera.entity';

@Module({
  controllers: [MedidasMaderaController],
  providers: [MedidasMaderaService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: MedidasMadera.name,
        schema: MedidaMaderaSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class MedidasMaderaModule {}
