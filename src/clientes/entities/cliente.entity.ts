import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Cliente extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  nombre: string;

  @Prop({
    unique: true,
    index: true,
  })
  curp: string;

  @Prop({
    unique: true,
    index: true,
  })
  codigo_identificacion: string;

  @Prop({
    unique: false,
    index: true,
  })
  rfn: string;

  @Prop({
    unique: false,
    index: true,
  })
  domicilio: string;

  @Prop({
    unique: false,
    index: true,
  })
  poblacion: string;

  @Prop({
    unique: false,
    index: true,
  })
  municipio: string;

  @Prop({
    unique: false,
    index: true,
  })
  entidad: string;
}

export const ClienteSchema = SchemaFactory.createForClass(Cliente);
