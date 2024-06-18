import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Gasolinera extends Document {
  @Prop({
    unique: false,
    index: true,
  })
  nombre: string;

  @Prop({
    unique: false,
    index: true,
  })
  direccion: string;

  @Prop({
    unique: true,
    index: true,
  })
  telefono: number;
}

export const GasolineraSchema = SchemaFactory.createForClass(Gasolinera);
