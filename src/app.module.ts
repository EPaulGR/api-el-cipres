import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CommonModule } from './common/common.module';
import { ClientesModule } from './clientes/clientes.module';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';
import { VehiculosModule } from './vehiculos/vehiculos.module';
import { TiposMaderaModule } from './tipos-madera/tipos-madera.module';
import { MedidasMaderaModule } from './medidas-madera/medidas-madera.module';
import { PersonalModule } from './personal/personal.module';
import { GasolinerasModule } from './gasolineras/gasolineras.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(process.env.MONGODB, {
      dbName: 'cipresdb',
    }),
    CommonModule,
    ClientesModule,
    VehiculosModule,
    TiposMaderaModule,
    MedidasMaderaModule,
    PersonalModule,
    GasolinerasModule,
  ],
})
export class AppModule {}
