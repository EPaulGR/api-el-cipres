import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @MinLength(1)
  nombre: string;

  @IsString()
  @MinLength(1)
  curp: string;

  @IsString()
  @MinLength(1)
  codigo_identificacion: string;

  @IsOptional()
  @IsString()
  rfn: string;

  @IsString()
  @MinLength(1)
  domicilio: string;

  @IsString()
  @MinLength(1)
  poblacion: string;

  @IsString()
  @MinLength(1)
  municipio: string;

  @IsString()
  @MinLength(1)
  entidad: string;
}
