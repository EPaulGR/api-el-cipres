import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TiposMadera extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  nombre: string;
}

export const TipoMaderaSchema = SchemaFactory.createForClass(TiposMadera);
