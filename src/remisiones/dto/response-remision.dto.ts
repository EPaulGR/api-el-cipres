import { Types } from 'mongoose';

export class ResponseRemisionDto {
  id: string;
  folio: number;
  registro_siem: string;
  curp: string;
  fecha_expedicion: string;
  hora_expedicion: string;
  fecha_vencimiento: string;
  hora_vencimiento: string;
  saldo_actual: number;
  cliente: Types.ObjectId;
  cantidad: number;
  descripcion: string;
  volumen: number;
  medida: string;
  cantidad_letra: string;
  saldo_disponible: number;
  cantidad_amparada: number;
  saldo_siguiente: number;
  vehiculo: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
