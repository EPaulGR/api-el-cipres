import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateGasolineraDto } from './dto/create-gasolinera.dto';
import { UpdateGasolineraDto } from './dto/update-gasolinera.dto';
import { Gasolinera } from './entities/gasolinera.entity';
import { Model, isValidObjectId } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class GasolinerasService {
  private defaultLimit: number;
  constructor(
    @InjectModel(Gasolinera.name)
    private readonly gasolineraModel: Model<Gasolinera>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit');
  }

  async create(createGasolineraDto: CreateGasolineraDto) {
    try {
      const gasolinera = await this.gasolineraModel.create(createGasolineraDto);
      return gasolinera;
    } catch (error) {
      this.handleExceptions(error);
    }
  }
  findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;
    return this.gasolineraModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 })
      .select('-__v');
  }

  async findOne(term: string) {
    let gasolinera: Gasolinera;
    if (!isNaN(+term)) {
      gasolinera = await this.gasolineraModel.findOne({ no: term });
    }
    // Mongo ID
    if (!gasolinera && isValidObjectId(term)) {
      gasolinera = await this.gasolineraModel.findById(term);
    }
    // Name
    if (!gasolinera) {
      gasolinera = await this.gasolineraModel.findOne({
        name: term.toLowerCase().trim(),
      });
    }
    if (!gasolinera) {
      throw new BadRequestException(`Gasolinera not found with id_ ${term}`);
    }
    return gasolinera;
  }

  async update(id: string, updateGasolineraDto: UpdateGasolineraDto) {
    const gasolinera = await this.findOne(id);
    if (updateGasolineraDto.nombre) {
      updateGasolineraDto.nombre = updateGasolineraDto.nombre.toLowerCase();
    }
    try {
      await gasolinera.updateOne(updateGasolineraDto);
      return { ...gasolinera.toJSON(), ...updateGasolineraDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.gasolineraModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new BadRequestException(`Gasolinera not found with id_ ${id}`);
    }
    return {
      message: `This action removes a #${id} gasolinera`,
    };
  }

  // Functions
  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Gasolinera already exists ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create gasolinera ${error}`);
  }
}
