import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Cliente, ClienteSchema } from './entities/cliente.entity';

@Module({
  controllers: [ClientesController],
  providers: [ClientesService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Cliente.name,
        schema: ClienteSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class ClientesModule {}
