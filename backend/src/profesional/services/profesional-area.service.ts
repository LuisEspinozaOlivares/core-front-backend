import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProfesionalAreaDto, CrearProfesionalAreaDto, ModificarProfesionalAreaDto } from '../dto/profesional-area';
import { ProfesionalAreaMapper } from '../mappers';
import { ProfesionalArea } from '../entities';

@Injectable()
export class ProfesionalAreaService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<ProfesionalAreaDto[]> {
    const list = await this.prisma.profesional_area.findMany();
    return list.map((item: ProfesionalArea) => ProfesionalAreaMapper.toDto(item));
  }

  async create(dto: CrearProfesionalAreaDto): Promise<ProfesionalAreaDto> {
    const data = ProfesionalAreaMapper.toEntity(dto);

    const created = await this.prisma.profesional_area.create({
      data: data as ProfesionalArea,
    });

    return ProfesionalAreaMapper.toDto(created);
  }

  async findOne(id: number): Promise<ProfesionalAreaDto> {
    const item = await this.prisma.profesional_area.findUnique({
      where: { profesional_area_id: id },
    });

    if (!item) {
      throw new NotFoundException('Área profesional no encontrada');
    }

    return ProfesionalAreaMapper.toDto(item);
  }

  async update(id: number, dto: ModificarProfesionalAreaDto): Promise<ProfesionalAreaDto> {
    await this.findOne(id);
    const data = ProfesionalAreaMapper.toEntity(dto);

    const updated = await this.prisma.profesional_area.update({
      where: { profesional_area_id: id },
      data: data as ProfesionalArea,
    });

    return ProfesionalAreaMapper.toDto(updated);
  }

  async remove(id: number): Promise<ProfesionalAreaDto> {
    await this.findOne(id);

    const deleted = await this.prisma.profesional_area.delete({
      where: { profesional_area_id: id },
    });

    return ProfesionalAreaMapper.toDto(deleted);
  }
}
