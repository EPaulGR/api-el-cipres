import { Module } from '@nestjs/common';
import { GasolinerasService } from './gasolineras.service';
import { GasolinerasController } from './gasolineras.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Gasolinera, GasolineraSchema } from './entities/gasolinera.entity';

@Module({
  controllers: [GasolinerasController],
  providers: [GasolinerasService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Gasolinera.name,
        schema: GasolineraSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class GasolinerasModule {}
