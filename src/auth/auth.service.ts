import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './entities/auth.entity';
import { Model, isValidObjectId } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class AuthService {
  private defaultLimit: number;
  constructor(
    @InjectModel(Auth.name)
    private readonly authModel: Model<Auth>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit');
  }

  async create(createAuthDto: CreateAuthDto) {
    try {
      const user = await this.authModel.create(createAuthDto);
      return user;
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
          { nombre_completo: { $regex: busqueda, $options: 'i' } }, // Si tienes un campo "nombre"
          // Agrega más campos según sea necesario
        ],
      };
    }
    return this.authModel
      .find(filter)
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 })
      .select('-__v');
  }

  async findOne(term: string) {
    let user: Auth;
    if (!isNaN(+term)) {
      user = await this.authModel.findOne({ no: term });
    }
    // Mongo ID
    if (!user && isValidObjectId(term)) {
      user = await this.authModel.findById(term);
    }
    // Name
    if (!user) {
      user = await this.authModel.findOne({
        name: term.toLowerCase().trim(),
      });
    }
    if (!user) {
      throw new BadRequestException(`Usuario not found with id_ ${term}`);
    }
    return user;
  }

  async update(id: string, updateAuthDto: UpdateAuthDto) {
    const user = await this.findOne(id);
    if (updateAuthDto.nombre_completo) {
      updateAuthDto.nombre_completo =
        updateAuthDto.nombre_completo.toLowerCase();
    }
    try {
      await user.updateOne(updateAuthDto);
      return { ...user.toJSON(), ...updateAuthDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.authModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new BadRequestException(`Usuario not found with id_ ${id}`);
    }
    return {
      message: `This action removes a #${id} usuario`,
    };
  }

  // Functions
  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Usuario already exists ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create usuario ${error}`);
  }
}
