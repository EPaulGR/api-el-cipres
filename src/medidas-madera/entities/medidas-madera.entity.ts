import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MedidasMadera extends Document {
  @Prop({
    unique: false,
    index: true,
  })
  medida: string;

  @Prop({
    unique: false,
    index: true,
  })
  ft: number;
}

export const MedidaMaderaSchema = SchemaFactory.createForClass(MedidasMadera);
