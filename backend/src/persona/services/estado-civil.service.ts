import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CrearEstadoCivilDto, EstadoCivilDto, ModificarEstadoCivilDto } from '../dto';
import { EstadoCivilMapper } from '../mappers';
import { EstadoCivil } from '../entities';

@Injectable()
export class EstadoCivilService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<EstadoCivilDto[]> {
    const list = await this.prisma.estado_civil.findMany();
    return list.map((estadoCivil: EstadoCivil) => EstadoCivilMapper.toDto(estadoCivil));
  }

  async create(crearEstadoCivilDto: CrearEstadoCivilDto): Promise<EstadoCivilDto> {
    const data = EstadoCivilMapper.toEntity(crearEstadoCivilDto);

    const created = await this.prisma.estado_civil.create({
      data: data as EstadoCivil,
    });

    return EstadoCivilMapper.toDto(created);
  }

  async findOne(id: number): Promise<EstadoCivilDto> {
    const estadoCivil = await this.prisma.estado_civil.findUnique({
      where: { estado_civil_id: id },
    });

    if (!estadoCivil) {
      throw new NotFoundException('Estado civil not found');
    }

    return EstadoCivilMapper.toDto(estadoCivil);
  }

  async update(id: number, modificarEstadoCivilDto: ModificarEstadoCivilDto): Promise<EstadoCivilDto> {
    await this.findOne(id);
    const data = EstadoCivilMapper.toEntity(modificarEstadoCivilDto);

    const updated = await this.prisma.estado_civil.update({
      where: { estado_civil_id: id },
      data: data as EstadoCivil,
    });

    return EstadoCivilMapper.toDto(updated);
  }

  async remove(id: number): Promise<EstadoCivilDto> {
    await this.findOne(id);

    const deleted = await this.prisma.estado_civil.delete({
      where: { estado_civil_id: id },
    });

    return EstadoCivilMapper.toDto(deleted);
  }
}