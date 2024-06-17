import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GasolinerasService } from './gasolineras.service';
import { CreateGasolineraDto } from './dto/create-gasolinera.dto';
import { UpdateGasolineraDto } from './dto/update-gasolinera.dto';

@Controller('gasolineras')
export class GasolinerasController {
  constructor(private readonly gasolinerasService: GasolinerasService) {}

  @Post()
  create(@Body() createGasolineraDto: CreateGasolineraDto) {
    return this.gasolinerasService.create(createGasolineraDto);
  }

  @Get()
  findAll() {
    return this.gasolinerasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gasolinerasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGasolineraDto: UpdateGasolineraDto) {
    return this.gasolinerasService.update(+id, updateGasolineraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gasolinerasService.remove(+id);
  }
}
