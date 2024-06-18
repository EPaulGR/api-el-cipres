import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Personal extends Document {
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

export const PersonalSchema = SchemaFactory.createForClass(Personal);
