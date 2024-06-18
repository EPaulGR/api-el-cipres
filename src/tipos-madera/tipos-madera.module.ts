import { Module } from '@nestjs/common';
import { TiposMaderaService } from './tipos-madera.service';
import { TiposMaderaController } from './tipos-madera.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TipoMaderaSchema, TiposMadera } from './entities/tipos-madera.entity';

@Module({
  controllers: [TiposMaderaController],
  providers: [TiposMaderaService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: TiposMadera.name,
        schema: TipoMaderaSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class TiposMaderaModule {}
