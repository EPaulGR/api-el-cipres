import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateMedidasMaderaDto } from './dto/create-medidas-madera.dto';
import { UpdateMedidasMaderaDto } from './dto/update-medidas-madera.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MedidasMadera } from './entities/medidas-madera.entity';
import { Model, isValidObjectId } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class MedidasMaderaService {
  private defaultLimit: number;
  constructor(
    @InjectModel(MedidasMadera.name)
    private readonly medidasMaderaModel: Model<MedidasMadera>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit');
  }

  async create(createMedidasMaderaDto: CreateMedidasMaderaDto) {
    try {
      const medidasMadera = await this.medidasMaderaModel.create(
        createMedidasMaderaDto,
      );
      return medidasMadera;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;
    return this.medidasMaderaModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 })
      .select('-__v');
  }

  async findOne(term: string) {
    let medidasMadera: MedidasMadera;
    if (!isNaN(+term)) {
      medidasMadera = await this.medidasMaderaModel.findOne({ no: term });
    }
    // Mongo ID
    if (!medidasMadera && isValidObjectId(term)) {
      medidasMadera = await this.medidasMaderaModel.findById(term);
    }
    // Name
    if (!medidasMadera) {
      medidasMadera = await this.medidasMaderaModel.findOne({
        name: term.toLowerCase().trim(),
      });
    }
    if (!medidasMadera) {
      throw new BadRequestException(`Medidas not found with id_ ${term}`);
    }
    return medidasMadera;
  }

  async update(id: string, updateMedidasMaderaDto: UpdateMedidasMaderaDto) {
    const medidasMadera = await this.findOne(id);
    try {
      await medidasMadera.updateOne(updateMedidasMaderaDto);
      return { ...medidasMadera.toJSON(), ...updateMedidasMaderaDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.medidasMaderaModel.deleteOne({
      _id: id,
    });
    if (deletedCount === 0) {
      throw new BadRequestException(`Medidas madera not found with id_ ${id}`);
    }
    return {
      message: `This action removes a #${id} medidas madera`,
    };
  }

  // Functions
  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Medidas madera already exists ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create medidas ${error}`);
  }
}
