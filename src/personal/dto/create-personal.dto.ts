import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreatePersonalDto {
  @IsString()
  @MinLength(1)
  nombre: string;

  @IsString()
  @MinLength(1)
  direccion: string;

  @IsNumber()
  telefono: number;
}
