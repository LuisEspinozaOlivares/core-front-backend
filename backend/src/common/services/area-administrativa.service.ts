import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AreaAdministrativaDto, CrearAreaAdministrativaDto, ModificarAreaAdministrativaDto } from '../dto';
import { AreaAdministrativa } from '../entities';
import { AreaAdministrativaMapper } from '../mappers';

@Injectable()
export class AreaAdministrativaService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<AreaAdministrativaDto[]> {
    const list = await this.prisma.area_administrativa.findMany();
    return list.map((item: AreaAdministrativa) => AreaAdministrativaMapper.toDto(item));
  }

  async create(crearAreaAdministrativaDto: CrearAreaAdministrativaDto): Promise<AreaAdministrativaDto> {
    const data = AreaAdministrativaMapper.toEntity(crearAreaAdministrativaDto);

    const created = await this.prisma.area_administrativa.create({
      data: data as AreaAdministrativa,
    });

    return AreaAdministrativaMapper.toDto(created);
  }

  async findOne(id: number): Promise<AreaAdministrativaDto> {
    const areaAdministrativa = await this.prisma.area_administrativa.findUnique({
      where: { area_administrativa_id: id },
    });

    if (!areaAdministrativa) {
      throw new NotFoundException('Area Administrativa no encontrada');
    }

    return AreaAdministrativaMapper.toDto(areaAdministrativa);
  }

  async update(id: number, modificarAreaAdministrativaDto: ModificarAreaAdministrativaDto): Promise<AreaAdministrativaDto> {
    await this.findOne(id);
    const data = AreaAdministrativaMapper.toEntity(modificarAreaAdministrativaDto);

    const updated = await this.prisma.area_administrativa.update({
      where: { area_administrativa_id: id },
      data: data as AreaAdministrativa,
    });

    return AreaAdministrativaMapper.toDto(updated);
  }

  async remove(id: number): Promise<AreaAdministrativaDto> {
    await this.findOne(id);

    const deleted = await this.prisma.area_administrativa.delete({
      where: { area_administrativa_id: id },
    });

    return AreaAdministrativaMapper.toDto(deleted);
  }
}