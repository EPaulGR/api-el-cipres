import { IsNumber, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateVehiculoDto {
  @IsString()
  @MinLength(1)
  medio_transporte: string;

  @IsString()
  @MinLength(1)
  propietario: string;

  @IsString()
  @MinLength(1)
  marca: string;

  @IsString()
  @MinLength(1)
  tipo: string;

  @IsNumber()
  @IsPositive()
  modelo: number;

  @IsNumber()
  @IsPositive()
  capacidad: number;

  @IsString()
  @MinLength(1)
  placas: string;
}
