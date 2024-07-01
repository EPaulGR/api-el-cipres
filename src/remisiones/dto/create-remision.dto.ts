import {
  IsNumber,
  IsPositive,
  IsMongoId,
  IsString,
  MinLength,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateRemisionDto {
  @IsNumber()
  @IsPositive()
  folio: number;

  // Datos formales del titular
  @IsString()
  @MinLength(1)
  registro_siem: string;

  // Datos formales del titular
  @IsString()
  @MinLength(1)
  curp: string;

  @IsString()
  @MinLength(1)
  fecha_expedicion: string;

  @IsString()
  @MinLength(1)
  hora_expedicion: string;

  @IsString()
  @MinLength(1)
  fecha_vencimiento: string;

  @IsString()
  @MinLength(1)
  hora_vencimiento: string;

  // Información del remanente
  @IsNumber()
  @IsPositive()
  saldo_actual: number;

  // Información del destinatario
  @IsMongoId()
  cliente: Types.ObjectId;

  // Información sobre la materia prima, producto o subproducto forestal
  @IsNumber()
  @IsPositive()
  cantidad: number;

  @IsString()
  descripcion: string;

  @IsNumber()
  @IsPositive()
  volumen: number;

  @IsString()
  medida: string;

  @IsString()
  @MinLength(1)
  cantidad_letra: string;

  // Información sobre saldos
  @IsNumber()
  @IsPositive()
  saldo_disponible: number;

  @IsNumber()
  @IsPositive()
  cantidad_amparada: number;

  @IsNumber()
  @IsPositive()
  saldo_siguiente: number;

  // Información sobre el vehículo
  @IsMongoId()
  vehiculo: Types.ObjectId;
}
