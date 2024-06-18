import { IsString, MinLength } from 'class-validator';

export class CreateTiposMaderaDto {
  @IsString()
  @MinLength(1)
  nombre: string;
}
