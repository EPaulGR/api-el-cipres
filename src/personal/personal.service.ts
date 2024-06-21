import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';
import { Personal } from './entities/personal.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PersonalService {
  private defaultLimit: number;
  constructor(
    @InjectModel(Personal.name)
    private readonly personalModel: Model<Personal>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit');
  }

  async create(createPersonalDto: CreatePersonalDto) {
    try {
      const personal = await this.personalModel.create(createPersonalDto);
      return personal;
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
    return this.personalModel
      .find(filter)
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 })
      .select('-__v');
  }

  async findOne(term: string) {
    let personal: Personal;
    if (!isNaN(+term)) {
      personal = await this.personalModel.findOne({ no: term });
    }
    // Mongo ID
    if (!personal && isValidObjectId(term)) {
      personal = await this.personalModel.findById(term);
    }
    // Name
    if (!personal) {
      personal = await this.personalModel.findOne({
        name: term.toLowerCase().trim(),
      });
    }
    if (!personal) {
      throw new BadRequestException(`Personal not found with id_ ${term}`);
    }
    return personal;
  }

  async update(id: string, updatePersonalDto: UpdatePersonalDto) {
    const personal = await this.findOne(id);
    try {
      await personal.updateOne(updatePersonalDto);
      return { ...personal.toJSON(), ...updatePersonalDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.personalModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new BadRequestException(`Personal not found with id_ ${id}`);
    }
    return {
      message: `This action removes a #${id} personal`,
    };
  }

  // Functions
  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Personal already exists ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create personal ${error}`);
  }
}
