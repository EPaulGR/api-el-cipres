import { Module } from '@nestjs/common';
import { VehiculosService } from './vehiculos.service';
import { VehiculosController } from './vehiculos.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Vehiculo, VehiculoSchema } from './entities/vehiculo.entity';

@Module({
  controllers: [VehiculosController],
  providers: [VehiculosService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Vehiculo.name,
        schema: VehiculoSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class VehiculosModule {}
