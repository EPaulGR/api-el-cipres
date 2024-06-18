import { PartialType } from '@nestjs/mapped-types';
import { CreateMedidasMaderaDto } from './create-medidas-madera.dto';

export class UpdateMedidasMaderaDto extends PartialType(
  CreateMedidasMaderaDto,
) {}
