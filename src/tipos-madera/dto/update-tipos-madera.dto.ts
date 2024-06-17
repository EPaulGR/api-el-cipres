import { PartialType } from '@nestjs/mapped-types';
import { CreateTiposMaderaDto } from './create-tipos-madera.dto';

export class UpdateTiposMaderaDto extends PartialType(CreateTiposMaderaDto) {}
