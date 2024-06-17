import { Injectable } from '@nestjs/common';
import { CreateGasolineraDto } from './dto/create-gasolinera.dto';
import { UpdateGasolineraDto } from './dto/update-gasolinera.dto';

@Injectable()
export class GasolinerasService {
  create(createGasolineraDto: CreateGasolineraDto) {
    return 'This action adds a new gasolinera';
  }

  findAll() {
    return `This action returns all gasolineras`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gasolinera`;
  }

  update(id: number, updateGasolineraDto: UpdateGasolineraDto) {
    return `This action updates a #${id} gasolinera`;
  }

  remove(id: number) {
    return `This action removes a #${id} gasolinera`;
  }
}
