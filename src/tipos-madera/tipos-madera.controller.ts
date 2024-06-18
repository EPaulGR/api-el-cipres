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
import { TiposMaderaService } from './tipos-madera.service';
import { CreateTiposMaderaDto } from './dto/create-tipos-madera.dto';
import { UpdateTiposMaderaDto } from './dto/update-tipos-madera.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller('tipos-madera')
export class TiposMaderaController {
  constructor(private readonly tiposMaderaService: TiposMaderaService) {}

  @Post()
  create(@Body() createTiposMaderaDto: CreateTiposMaderaDto) {
    return this.tiposMaderaService.create(createTiposMaderaDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.tiposMaderaService.findAll(paginationDto);
  } // listo

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tiposMaderaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTiposMaderaDto: UpdateTiposMaderaDto,
  ) {
    return this.tiposMaderaService.update(id, updateTiposMaderaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.tiposMaderaService.remove(id);
  }
}
