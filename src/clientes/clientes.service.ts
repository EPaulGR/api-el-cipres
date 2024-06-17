import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cliente } from './entities/cliente.entity';
import { Model, isValidObjectId } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ClientesService {
  private defaultLimit: number;
  constructor(
    @InjectModel(Cliente.name)
    private readonly clienteModel: Model<Cliente>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit');
  }

  async create(createClienteDto: CreateClienteDto) {
    createClienteDto.nombre = createClienteDto.nombre.toLowerCase();
    try {
      const cliente = await this.clienteModel.create(createClienteDto);
      return cliente;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;
    return this.clienteModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 })
      .select('-__v');
  }

  async findOne(term: string) {
    let cliente: Cliente;
    if (!isNaN(+term)) {
      cliente = await this.clienteModel.findOne({ no: term });
    }
    // Mongo ID
    if (!cliente && isValidObjectId(term)) {
      cliente = await this.clienteModel.findById(term);
    }
    // Name
    if (!cliente) {
      cliente = await this.clienteModel.findOne({
        name: term.toLowerCase().trim(),
      });
    }
    if (!cliente) {
      throw new BadRequestException(`Cliente not found with id_ ${term}`);
    }
    return cliente;
  }

  async update(id: string, updateClienteDto: UpdateClienteDto) {
    const cliente = await this.findOne(id);
    if (updateClienteDto.nombre) {
      updateClienteDto.nombre = updateClienteDto.nombre.toLowerCase();
    }
    try {
      await cliente.updateOne(updateClienteDto);
      return { ...cliente.toJSON(), ...updateClienteDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.clienteModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new BadRequestException(`Cliente not found with id_ ${id}`);
    }
    return {
      message: `This action removes a #${id} cliente`,
    };
  }

  // Functions
  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Cliente already exists ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create cliente ${error}`);
  }
}
