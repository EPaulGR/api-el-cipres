import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Remision extends Document {
  @Prop({ unique: true, index: true })
  folio: number;

  @Prop({ unique: false, index: true })
  registro_siem: string;

  @Prop({ unique: false, index: true })
  curp: string;

  @Prop({ unique: false, index: true })
  fecha_expedicion: string;

  @Prop({ unique: false, index: true })
  hora_expedicion: string;

  @Prop({ unique: false, index: true })
  fecha_vencimiento: string;

  @Prop({ unique: false, index: true })
  hora_vencimiento: string;

  @Prop({ unique: false, index: true })
  saldo_actual: number;

  @Prop({ unique: false, index: true, ref: 'Cliente' })
  cliente: Types.ObjectId;

  @Prop({ unique: false, index: true })
  cantidad: number;

  @Prop({ unique: false, index: true })
  descripcion: string;

  @Prop({ unique: false, index: true })
  volumen: number;

  @Prop({ unique: false, index: true })
  medida: string;

  @Prop({ unique: false, index: true })
  cantidad_letra: string;

  @Prop({ unique: false, index: true })
  saldo_disponible: number;

  @Prop({ unique: false, index: true })
  cantidad_amparada: number;

  @Prop({ unique: false, index: true })
  saldo_siguiente: number;

  @Prop({ unique: false, index: true, ref: 'Vehiculo' })
  vehiculo: Types.ObjectId;
}

export const RemisionSchema = SchemaFactory.createForClass(Remision);
