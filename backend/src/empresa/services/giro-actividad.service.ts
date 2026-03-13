import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CrearGiroActividadDto, GiroActividadDto, ModificarGiroActividadDto } from '../dto';
import { GiroActividadMapper } from '../mappers';
import { GiroActividad } from '../entities';

@Injectable()
export class GiroActividadService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<GiroActividadDto[]> {
    const list = await this.prisma.giro_actividad.findMany();
    return list.map((giroActividad: GiroActividad) => GiroActividadMapper.toDto(giroActividad));
  }

  async create(crearGiroActividadDto: CrearGiroActividadDto): Promise<GiroActividadDto> {
    const data = GiroActividadMapper.toEntity(crearGiroActividadDto);

    const created = await this.prisma.giro_actividad.create({
      data: data as GiroActividad,
    });

    return GiroActividadMapper.toDto(created);
  }

  async findOne(id: number): Promise<GiroActividadDto> {
    const giroActividad = await this.prisma.giro_actividad.findUnique({
      where: { giro_actividad_id: id },
    });

    if (!giroActividad) {
      throw new NotFoundException('Giro actividad no encontrado');
    }

    return GiroActividadMapper.toDto(giroActividad);
  }

  async update(id: number, modificarGiroActividadDto: ModificarGiroActividadDto): Promise<GiroActividadDto> {
    await this.findOne(id);
    const data = GiroActividadMapper.toEntity(modificarGiroActividadDto);

    const updated = await this.prisma.giro_actividad.update({
      where: { giro_actividad_id: id },
      data: data as GiroActividad,
    });

    return GiroActividadMapper.toDto(updated);
  }

  async remove(id: number): Promise<GiroActividadDto> {
    await this.findOne(id);

    const deleted = await this.prisma.giro_actividad.delete({
      where: { giro_actividad_id: id },
    });

    return GiroActividadMapper.toDto(deleted);
  }
}