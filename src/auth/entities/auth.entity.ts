import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Auth extends Document {
  @Prop({
    required: true,
  })
  nombre_completo: string;

  @Prop({
    required: true,
    unique: true,
  })
  correo: string;

  @Prop({
    required: true,
  })
  contrasena: string;

  @Prop({
    required: false,
  })
  telefono: string;

  @Prop({
    required: true,
    unique: false,
  })
  tipo: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
