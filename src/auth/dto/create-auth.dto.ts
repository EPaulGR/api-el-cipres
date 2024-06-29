import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  nombre_completo: string;

  @IsNotEmpty()
  @IsEmail()
  correo: string;

  @IsNotEmpty()
  @MinLength(6)
  contrasena: string;

  @IsString()
  telefono: string;

  @IsString()
  @IsNotEmpty()
  tipo: string;
}
