import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CargoProfesionalDto, CrearCargoProfesionalDto, ModificarCargoProfesionalDto } from '../dto/cargo-profesional';
import { CargoProfesionalMapper } from '../mappers';
import { CargoProfesional } from '../entities';

@Injectable()
export class CargoProfesionalService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<CargoProfesionalDto[]> {
    const list = await this.prisma.profesional_cargo.findMany();
    return list.map((item: CargoProfesional) => CargoProfesionalMapper.toDto(item));
  }

  async create(dto: CrearCargoProfesionalDto): Promise<CargoProfesionalDto> {
    const data = CargoProfesionalMapper.toEntity(dto);

    const created = await this.prisma.profesional_cargo.create({
      data: data as CargoProfesional,
    });

    return CargoProfesionalMapper.toDto(created);
  }

  async findOne(id: number): Promise<CargoProfesionalDto> {
    const item = await this.prisma.profesional_cargo.findUnique({
      where: { profesional_cargo_id: id },
    });

    if (!item) {
      throw new NotFoundException('Cargo profesional no encontrado');
    }

    return CargoProfesionalMapper.toDto(item);
  }

  async update(id: number, dto: ModificarCargoProfesionalDto): Promise<CargoProfesionalDto> {
    await this.findOne(id);
    const data = CargoProfesionalMapper.toEntity(dto);

    const updated = await this.prisma.profesional_cargo.update({
      where: { profesional_cargo_id: id },
      data: data as CargoProfesional,
    });

    return CargoProfesionalMapper.toDto(updated);
  }

  async remove(id: number): Promise<CargoProfesionalDto> {
    await this.findOne(id);

    const deleted = await this.prisma.profesional_cargo.delete({
      where: { profesional_cargo_id: id },
    });

    return CargoProfesionalMapper.toDto(deleted);
  }
}
