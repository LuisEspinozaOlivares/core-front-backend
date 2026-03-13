import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CrearGeneroDto, GeneroDto, ModificarGeneroDto } from '../dto';
import { GeneroMapper } from '../mappers';
import { Genero } from '../entities';

@Injectable()
export class GeneroService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<GeneroDto[]> {
    const list = await this.prisma.genero.findMany();
    return list.map((item: Genero) => GeneroMapper.toDto(item));
  }

  async create(crearGeneroDto: CrearGeneroDto): Promise<GeneroDto> {
    const data = GeneroMapper.toEntity(crearGeneroDto);

    const created = await this.prisma.genero.create({
      data: data as Genero,
    });

    return GeneroMapper.toDto(created);
  }

  async findOne(id: number): Promise<GeneroDto> {
    const genero = await this.prisma.genero.findUnique({
      where: { genero_id: id },
    });

    if (!genero) {
      throw new NotFoundException('Genero not found');
    }

    return GeneroMapper.toDto(genero);
  }

  async update(id: number, modificarGeneroDto: ModificarGeneroDto): Promise<GeneroDto> {
    await this.findOne(id);
    const data = GeneroMapper.toEntity(modificarGeneroDto);

    const updated = await this.prisma.genero.update({
      where: { genero_id: id },
      data: data as Genero,
    });

    return GeneroMapper.toDto(updated);
  }

  async remove(id: number): Promise<GeneroDto> {
    await this.findOne(id);

    const deleted = await this.prisma.genero.delete({
      where: { genero_id: id },
    });

    return GeneroMapper.toDto(deleted);
  }
}