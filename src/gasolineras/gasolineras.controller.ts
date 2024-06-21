import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { GasolinerasService } from './gasolineras.service';
import { CreateGasolineraDto } from './dto/create-gasolinera.dto';
import { UpdateGasolineraDto } from './dto/update-gasolinera.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('gasolineras')
export class GasolinerasController {
  constructor(private readonly gasolinerasService: GasolinerasService) {}

  @Post()
  create(@Body() createGasolineraDto: CreateGasolineraDto) {
    return this.gasolinerasService.create(createGasolineraDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.gasolinerasService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gasolinerasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGasolineraDto: UpdateGasolineraDto,
  ) {
    return this.gasolinerasService.update(id, updateGasolineraDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.gasolinerasService.remove(id);
  }
}
