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
import { RemisionesService } from './remisiones.service';
import { CreateRemisionDto } from './dto/create-remision.dto';
import { UpdateRemisionDto } from './dto/update-remision.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ResponseRemisionDto } from './dto/response-remision.dto';

@Controller('remisiones')
export class RemisionesController {
  constructor(private readonly remisionesService: RemisionesService) {}

  @Post()
  create(@Body() createRemisionDto: CreateRemisionDto) {
    return this.remisionesService.create(createRemisionDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.remisionesService.findAll(paginationDto);
  }

  @Get('last')
  async findLast(): Promise<ResponseRemisionDto> {
    return this.remisionesService.findLast();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ResponseRemisionDto> {
    return this.remisionesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRemisionDto: UpdateRemisionDto,
  ) {
    return this.remisionesService.update(id, updateRemisionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.remisionesService.remove(id);
  }
}
