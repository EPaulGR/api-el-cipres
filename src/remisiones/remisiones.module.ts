import { Module } from '@nestjs/common';
import { RemisionesService } from './remisiones.service';
import { RemisionesController } from './remisiones.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Remision, RemisionSchema } from './entities/remision.entity';

@Module({
  controllers: [RemisionesController],
  providers: [RemisionesService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Remision.name,
        schema: RemisionSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class RemisionesModule {}
