import { IsPositive, IsString, MinLength } from 'class-validator';

export class CreateMedidasMaderaDto {
  @IsString()
  @MinLength(1)
  medida: string;

  @IsPositive()
  ft: number;
}
