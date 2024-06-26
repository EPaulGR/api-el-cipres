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
import { PersonalService } from './personal.service';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('personal')
export class PersonalController {
  constructor(private readonly personalService: PersonalService) {}

  @Post()
  create(@Body() createPersonalDto: CreatePersonalDto) {
    return this.personalService.create(createPersonalDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.personalService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personalService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePersonalDto: UpdatePersonalDto,
  ) {
    return this.personalService.update(id, updatePersonalDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.personalService.remove(id);
  }
}
