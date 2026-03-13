import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { NacionalidadMapper } from '../mappers';
import { CrearNacionalidadDto, ModificarNacionalidadDto, NacionalidadDto } from '../dto';
import { Nacionalidad } from '../entities';

@Injectable()
export class NacionalidadService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<NacionalidadDto[]> {
    const list = await this.prisma.nacionalidad.findMany();
    return list.map((item: Nacionalidad) => NacionalidadMapper.toDto(item));
  }

  async create(crearNacionalidadDto: CrearNacionalidadDto): Promise<NacionalidadDto> {
    const data = NacionalidadMapper.toEntity(crearNacionalidadDto);

    const created = await this.prisma.nacionalidad.create({
      data: data as Nacionalidad,
    });

    return NacionalidadMapper.toDto(created);
  }

  async findOne(id: number): Promise<NacionalidadDto> {
    const nacionalidad = await this.prisma.nacionalidad.findUnique({
      where: { nacionalidad_id: id },
    });

    if (!nacionalidad) {
      throw new NotFoundException('Nacionalidad not found');
    }

    return NacionalidadMapper.toDto(nacionalidad);
  }

  async update(id: number, modificarNacionalidadDto: ModificarNacionalidadDto): Promise<NacionalidadDto> {
    await this.findOne(id);
    const data = NacionalidadMapper.toEntity(modificarNacionalidadDto);

    const updated = await this.prisma.nacionalidad.update({
      where: { nacionalidad_id: id },
      data: data as Nacionalidad,
    });

    return NacionalidadMapper.toDto(updated);
  }

  async remove(id: number): Promise<NacionalidadDto> {
    await this.findOne(id);

    const deleted = await this.prisma.nacionalidad.delete({
      where: { nacionalidad_id: id },
    });

    return NacionalidadMapper.toDto(deleted);
  }
}