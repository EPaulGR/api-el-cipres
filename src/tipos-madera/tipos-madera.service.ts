import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UpdateTiposMaderaDto } from './dto/update-tipos-madera.dto';
import { CreateTiposMaderaDto } from './dto/create-tipos-madera.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TiposMadera } from './entities/tipos-madera.entity';
import { Model, isValidObjectId } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class TiposMaderaService {
  private defaultLimit: number;
  constructor(
    @InjectModel(TiposMadera.name)
    private readonly tipoMaderaModel: Model<TiposMadera>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit');
  }

  async create(createTipoMaderaDto: CreateTiposMaderaDto) {
    try {
      const tipoMadera = await this.tipoMaderaModel.create(createTipoMaderaDto);
      return tipoMadera;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0, busqueda } = paginationDto;
    let filter = {};
    if (busqueda) {
      filter = {
        $or: [
          { nombre: { $regex: busqueda, $options: 'i' } }, // Si tienes un campo "nombre"
          // Agrega más campos según sea necesario
        ],
      };
    }
    return this.tipoMaderaModel
      .find(filter)
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 })
      .select('-__v');
  }

  async findOne(term: string) {
    let tipoMadera: TiposMadera;
    if (!isNaN(+term)) {
      tipoMadera = await this.tipoMaderaModel.findOne({ no: term });
    }
    // Mongo ID
    if (!tipoMadera && isValidObjectId(term)) {
      tipoMadera = await this.tipoMaderaModel.findById(term);
    }
    // Name
    if (!tipoMadera) {
      tipoMadera = await this.tipoMaderaModel.findOne({
        name: term.toLowerCase().trim(),
      });
    }
    if (!tipoMadera) {
      throw new BadRequestException(`Tipo madera not found with id_ ${term}`);
    }
    return tipoMadera;
  }

  async update(id: string, updateTipoMaderaDto: UpdateTiposMaderaDto) {
    const tipoMadera = await this.findOne(id);
    try {
      await tipoMadera.updateOne(updateTipoMaderaDto);
      return { ...tipoMadera.toJSON(), ...updateTipoMaderaDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.tipoMaderaModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new BadRequestException(`Tipo madera not found with id_ ${id}`);
    }
    return {
      message: `This action removes a #${id} tipo madera`,
    };
  }

  // Functions
  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Tipo madera already exists ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create tipo madera ${error}`);
  }
}
