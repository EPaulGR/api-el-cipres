import { Injectable } from '@nestjs/common';
import { CreateTiposMaderaDto } from './dto/create-tipos-madera.dto';
import { UpdateTiposMaderaDto } from './dto/update-tipos-madera.dto';

@Injectable()
export class TiposMaderaService {
  create(createTiposMaderaDto: CreateTiposMaderaDto) {
    return 'This action adds a new tiposMadera';
  }

  findAll() {
    return `This action returns all tiposMadera`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tiposMadera`;
  }

  update(id: number, updateTiposMaderaDto: UpdateTiposMaderaDto) {
    return `This action updates a #${id} tiposMadera`;
  }

  remove(id: number) {
    return `This action removes a #${id} tiposMadera`;
  }
}
