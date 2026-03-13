import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EstadoProfesionalDto, CrearEstadoProfesionalDto, ModificarEstadoProfesionalDto } from '../dto/estado-profesional';
import { EstadoProfesionalMapper } from '../mappers/estado-profesional.mapper';
import { EstadoProfesional } from '../entities/estado-profesional.entity';

@Injectable()
export class EstadoProfesionalService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<EstadoProfesionalDto[]> {
    const list = await this.prisma.estado_profesional.findMany();
    return list.map((item: EstadoProfesional) => EstadoProfesionalMapper.toDto(item));
  }

  async create(crearDto: CrearEstadoProfesionalDto): Promise<EstadoProfesionalDto> {
    const data = EstadoProfesionalMapper.toEntity(crearDto);

    const created = await this.prisma.estado_profesional.create({
      data: data as EstadoProfesional,
    });

    return EstadoProfesionalMapper.toDto(created);
  }

  async findOne(id: number): Promise<EstadoProfesionalDto> {
    const item = await this.prisma.estado_profesional.findUnique({
      where: { estado_profesional_id: id },
    });

    if (!item) {
      throw new NotFoundException('Estado Profesional no encontrado');
    }

    return EstadoProfesionalMapper.toDto(item);
  }

  async update(id: number, modificarDto: ModificarEstadoProfesionalDto): Promise<EstadoProfesionalDto> {
    await this.findOne(id);
    const data = EstadoProfesionalMapper.toEntity(modificarDto);

    const updated = await this.prisma.estado_profesional.update({
      where: { estado_profesional_id: id },
      data: data as EstadoProfesional,
    });

    return EstadoProfesionalMapper.toDto(updated);
  }

  async remove(id: number): Promise<EstadoProfesionalDto> {
    await this.findOne(id);

    const deleted = await this.prisma.estado_profesional.delete({
      where: { estado_profesional_id: id },
    });

    return EstadoProfesionalMapper.toDto(deleted);
  }
}
