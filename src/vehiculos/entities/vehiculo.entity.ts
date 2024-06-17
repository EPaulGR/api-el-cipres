import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Vehiculo extends Document {
  @Prop({
    unique: false,
    index: true,
  })
  medio_transporte: string;

  @Prop({
    unique: false,
    index: true,
  })
  propietario: string;

  @Prop({
    unique: false,
    index: true,
  })
  marca: string;

  @Prop({
    unique: false,
    index: true,
  })
  tipo: string;

  @Prop({
    unique: false,
    index: true,
  })
  modelo: number;

  @Prop({
    unique: false,
    index: true,
  })
  capacidad: number;

  @Prop({
    unique: true,
    index: true,
  })
  placas: string;
}

export const VehiculoSchema = SchemaFactory.createForClass(Vehiculo);
