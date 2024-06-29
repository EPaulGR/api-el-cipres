import { PartialType } from '@nestjs/mapped-types';
import { CreateRemisionDto } from './create-remision.dto';

export class UpdateRemisionDto extends PartialType(CreateRemisionDto) {}
