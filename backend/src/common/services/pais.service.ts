import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CrearPaisDto, ModificarPaisDto, PaisDto } from '../dto';
import { PaisMapper } from '../mappers';
import { Pais } from '../entities';

@Injectable()
export class PaisService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<PaisDto[]> {
    const list = await this.prisma.pais.findMany();
    return list.map((item: Pais) => PaisMapper.toDto(item));
  }

  async create(crearPaisDto: CrearPaisDto): Promise<PaisDto> {
    const data = PaisMapper.toEntity(crearPaisDto);

    const created = await this.prisma.pais.create({
      data: data as Pais,
    });

    return PaisMapper.toDto(created);
  }

  async findOne(id: number): Promise<PaisDto> {
    const pais = await this.prisma.pais.findUnique({
      where: { pais_id: id },
    });

    if (!pais) {
      throw new NotFoundException('Pais not found');
    }

    return PaisMapper.toDto(pais);
  }

  async update(id: number, modificarPaisDto: ModificarPaisDto): Promise<PaisDto> {
    await this.findOne(id);
    const data = PaisMapper.toEntity(modificarPaisDto);

    const updated = await this.prisma.pais.update({
      where: { pais_id: id },
      data: data as Pais,
    });

    return PaisMapper.toDto(updated);
  }

  async remove(id: number): Promise<PaisDto> {
    await this.findOne(id);

    const deleted = await this.prisma.pais.delete({
      where: { pais_id: id },
    });

    return PaisMapper.toDto(deleted);
  }
}
