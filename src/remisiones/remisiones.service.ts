import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRemisionDto } from './dto/create-remision.dto';
import { UpdateRemisionDto } from './dto/update-remision.dto';
import { Remision } from './entities/remision.entity';
import { Model, Types, isValidObjectId } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ResponseRemisionDto } from './dto/response-remision.dto';

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

  async create(
    createRemisionDto: CreateRemisionDto,
  ): Promise<ResponseRemisionDto> {
    try {
      const { cliente, vehiculo, ...rest } = createRemisionDto;
      const remision = await this.remisionModel.create({
        ...rest,
        cliente: new Types.ObjectId(cliente),
        vehiculo: new Types.ObjectId(vehiculo),
      });
      return this.mapToResponseDto(remision);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseRemisionDto[]> {
    const { limit = this.defaultLimit, offset = 0, busqueda } = paginationDto;
    let filter = {};

    if (busqueda) {
      const busquedaRegEx = new RegExp(busqueda, 'i');
      filter = {
        $or: [
          {
            $expr: {
              $regexMatch: {
                input: { $toString: '$folio' },
                regex: busquedaRegEx,
              },
            },
          },
          // Agrega más campos según sea necesario
        ],
      };
    }

    try {
      const remisiones = await this.remisionModel
        .find(filter)
        .limit(limit)
        .skip(offset)
        .sort({ createdAt: -1 }) // Ordena en orden descendente por createdAt
        .select('-__v')
        .populate('cliente') // Incluye el documento de Cliente
        .populate('vehiculo'); // Incluye el documento de Vehículo
      return remisiones.map(this.mapToResponseDto);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findOne(term: string): Promise<ResponseRemisionDto> {
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
      throw new NotFoundException(`Remisión not found with id_ ${term}`);
    }
    return this.mapToResponseDto(remision);
  }

  async update(
    id: string,
    updateRemisionDto: UpdateRemisionDto,
  ): Promise<ResponseRemisionDto> {
    try {
      const remision = await this.remisionModel.findByIdAndUpdate(
        id,
        updateRemisionDto,
        {
          new: true, // Devuelve el documento actualizado
        },
      );
      if (!remision) {
        throw new NotFoundException(`Remisión not found with id_ ${id}`);
      }
      return this.mapToResponseDto(remision);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.remisionModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new NotFoundException(`Remisión not found with id_ ${id}`);
    }
    return {
      message: `This action removes a #${id} remisión`,
    };
  }

  async findLast(): Promise<ResponseRemisionDto> {
    try {
      const remision = await this.remisionModel
        .findOne()
        .sort({ createdAt: -1 }) // Ordena en orden descendente por createdAt
        .populate('cliente')
        .populate('vehiculo')
        .exec();
      if (!remision) {
        throw new NotFoundException('No remisiones found');
      }
      return this.mapToResponseDto(remision);
    } catch (error) {
      this.handleExceptions(error);
    }
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

  private mapToResponseDto(remision: Remision): ResponseRemisionDto {
    const { _id, createdAt, updatedAt, ...rest } = remision.toObject();
    return {
      ...rest,
      id: _id.toString(),
      createdAt,
      updatedAt,
    };
  }
}
