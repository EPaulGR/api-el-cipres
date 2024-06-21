import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Gasolinera extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  nombre: string;

  @Prop({
    unique: true,
    index: true,
  })
  direccion: string;

  @Prop({
    unique: true,
    index: true,
  })
  telefono: string;
}

export const GasolineraSchema = SchemaFactory.createForClass(Gasolinera);
