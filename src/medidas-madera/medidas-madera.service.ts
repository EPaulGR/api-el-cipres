import { Injectable } from '@nestjs/common';
import { CreateMedidasMaderaDto } from './dto/create-medidas-madera.dto';
import { UpdateMedidasMaderaDto } from './dto/update-medidas-madera.dto';

@Injectable()
export class MedidasMaderaService {
  create(createMedidasMaderaDto: CreateMedidasMaderaDto) {
    return 'This action adds a new medidasMadera';
  }

  findAll() {
    return `This action returns all medidasMadera`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medidasMadera`;
  }

  update(id: number, updateMedidasMaderaDto: UpdateMedidasMaderaDto) {
    return `This action updates a #${id} medidasMadera`;
  }

  remove(id: number) {
    return `This action removes a #${id} medidasMadera`;
  }
}
