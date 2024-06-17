import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Vehiculo } from './entities/vehiculo.entity';
import { Model, isValidObjectId } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class VehiculosService {
  private defaultLimit: number;
  constructor(
    @InjectModel(Vehiculo.name)
    private readonly vehiculoModel: Model<Vehiculo>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit');
  }

  async create(createVehiculoDto: CreateVehiculoDto) {
    try {
      const vehiculo = await this.vehiculoModel.create(createVehiculoDto);
      return vehiculo;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;
    return this.vehiculoModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 })
      .select('-__v');
  }

  async findOne(term: string) {
    let vehiculo: Vehiculo;
    if (!isNaN(+term)) {
      vehiculo = await this.vehiculoModel.findOne({ no: term });
    }
    // Mongo ID
    if (!vehiculo && isValidObjectId(term)) {
      vehiculo = await this.vehiculoModel.findById(term);
    }
    // Name
    if (!vehiculo) {
      vehiculo = await this.vehiculoModel.findOne({
        name: term.toLowerCase().trim(),
      });
    }
    if (!vehiculo) {
      throw new BadRequestException(`Vehiculo not found with id_ ${term}`);
    }
    return vehiculo;
  }

  async update(id: string, updateVehiculoDto: UpdateVehiculoDto) {
    const vehiculo = await this.findOne(id);
    try {
      await vehiculo.updateOne(updateVehiculoDto);
      return { ...vehiculo.toJSON(), ...updateVehiculoDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.vehiculoModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new BadRequestException(`Vehiculo not found with id_ ${id}`);
    }
    return {
      message: `This action removes a #${id} vehiculo`,
    };
  }

  // Functions
  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Vehiculo already exists ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create vehiculo ${error}`);
  }
}
