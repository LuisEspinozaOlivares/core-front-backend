import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CrearPrevisionSaludDto, PrevisionSaludDto, ModificarPrevisionSaludDto } from '../dto';
import { PrevisionSaludMapper } from '../mappers';
import { PrevisionSalud } from '../entities';

@Injectable()
export class PrevisionSaludService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<PrevisionSaludDto[]> {
    const list = await this.prisma.prevision_salud.findMany();
    return list.map((item: PrevisionSalud) => PrevisionSaludMapper.toDto(item));
  }

  async create(dto: CrearPrevisionSaludDto): Promise<PrevisionSaludDto> {
    const data = PrevisionSaludMapper.toEntity(dto);

    const created = await this.prisma.prevision_salud.create({
      data: data as PrevisionSalud,
    });

    return PrevisionSaludMapper.toDto(created);
  }

  async findOne(id: number): Promise<PrevisionSaludDto> {
    const item = await this.prisma.prevision_salud.findUnique({
      where: { prevision_salud_id: id },
    });

    if (!item) {
      throw new NotFoundException('Previsión de salud no encontrada');
    }

    return PrevisionSaludMapper.toDto(item);
  }

  async update(id: number, dto: ModificarPrevisionSaludDto): Promise<PrevisionSaludDto> {
    await this.findOne(id);
    const data = PrevisionSaludMapper.toEntity(dto);

    const updated = await this.prisma.prevision_salud.update({
      where: { prevision_salud_id: id },
      data: data as PrevisionSalud,
    });

    return PrevisionSaludMapper.toDto(updated);
  }

  async remove(id: number): Promise<PrevisionSaludDto> {
    await this.findOne(id);

    const deleted = await this.prisma.prevision_salud.delete({
      where: { prevision_salud_id: id },
    });

    return PrevisionSaludMapper.toDto(deleted);
  }
}
