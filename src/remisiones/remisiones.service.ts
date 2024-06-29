import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateRemisionDto } from './dto/create-remision.dto';
import { UpdateRemisionDto } from './dto/update-remision.dto';
import { Remision } from './entities/remision.entity';
import { Model, Types, isValidObjectId } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RemisionesService {
  private defaultLimit: number;
  constructor(
    @InjectModel(Remision.name)
    private readonly remisionModel: Model<Remision>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit');
  }

  async create(createRemisionDto: CreateRemisionDto) {
    try {
      const { cliente, vehiculo, ...rest } = createRemisionDto;
      const remision = await this.remisionModel.create({
        ...rest,
        cliente: new Types.ObjectId(cliente),
        vehiculo: new Types.ObjectId(vehiculo),
      });
      return remision;
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
          { folio: { $regex: busqueda, $options: 'i' } }, // Si tienes un campo "folio"
          // Agrega más campos según sea necesario
        ],
      };
    }
    return this.remisionModel
      .find(filter)
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 })
      .select('-__v')
      .populate('cliente') // Incluye el documento de Cliente
      .populate('vehiculo'); // Incluye el documento de Vehículo
  }

  async findOne(term: string) {
    let remision: Remision;
    if (!isNaN(+term)) {
      remision = await this.remisionModel.findOne({ no: term });
    }
    // Mongo ID
    if (!remision && isValidObjectId(term)) {
      remision = await this.remisionModel.findById(term);
    }
    // Name
    if (!remision) {
      remision = await this.remisionModel.findOne({
        name: term.toLowerCase().trim(),
      });
    }
    if (!remision) {
      throw new BadRequestException(`Remisión not found with id_ ${term}`);
    }
    return remision;
  }

  async update(id: string, updateRemisionDto: UpdateRemisionDto) {
    const remision = await this.findOne(id);
    try {
      await remision.updateOne(updateRemisionDto);
      return { ...remision.toJSON(), ...updateRemisionDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.remisionModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new BadRequestException(`Remisión not found with id_ ${id}`);
    }
    return {
      message: `This action removes a #${id} remisión`,
    };
  }
  // Functions
  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Remision already exists ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create remision ${error}`);
  }
}
