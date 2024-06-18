import { IsNumber, IsPositive, IsString, MinLength } from 'class-validator';
export class CreateGasolineraDto {
  @IsString()
  @MinLength(1)
  nombre: string;

  @IsString()
  @MinLength(1)
  direccion: string;

  @IsNumber()
  @IsPositive()
  telefono: number;
}
