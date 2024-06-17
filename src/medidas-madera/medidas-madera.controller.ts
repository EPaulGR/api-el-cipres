import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedidasMaderaService } from './medidas-madera.service';
import { CreateMedidasMaderaDto } from './dto/create-medidas-madera.dto';
import { UpdateMedidasMaderaDto } from './dto/update-medidas-madera.dto';

@Controller('medidas-madera')
export class MedidasMaderaController {
  constructor(private readonly medidasMaderaService: MedidasMaderaService) {}

  @Post()
  create(@Body() createMedidasMaderaDto: CreateMedidasMaderaDto) {
    return this.medidasMaderaService.create(createMedidasMaderaDto);
  }

  @Get()
  findAll() {
    return this.medidasMaderaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medidasMaderaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedidasMaderaDto: UpdateMedidasMaderaDto) {
    return this.medidasMaderaService.update(+id, updateMedidasMaderaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medidasMaderaService.remove(+id);
  }
}
