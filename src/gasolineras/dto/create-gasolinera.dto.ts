import { IsString, MinLength } from 'class-validator';

export class CreateGasolineraDto {
  @IsString()
  @MinLength(1)
  nombre: string;

  @IsString()
  @MinLength(1)
  direccion: string;

  @IsString()
  @MinLength(1)
  telefono: string;
}
