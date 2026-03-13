import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CrearSectorEconomicoDto, SectorEconomicoDto, ModificarSectorEconomicoDto } from '../dto';
import { SectorEconomicoMapper } from '../mappers';
import { SectorEconomico } from '../entities';

@Injectable()
export class SectorEconomicoService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<SectorEconomicoDto[]> {
    const list = await this.prisma.sector_economico.findMany();
    return list.map((sectorEconomico: SectorEconomico) => SectorEconomicoMapper.toDto(sectorEconomico));
  }

  async create(crearSectorEconomicoDto: CrearSectorEconomicoDto): Promise<SectorEconomicoDto> {
    const data = SectorEconomicoMapper.toEntity(crearSectorEconomicoDto);

    const created = await this.prisma.sector_economico.create({
      data: data as SectorEconomico,
    });

    return SectorEconomicoMapper.toDto(created);
  }

  async findOne(id: number): Promise<SectorEconomicoDto> {
    const sectorEconomico = await this.prisma.sector_economico.findUnique({
      where: { sector_economico_id: id },
    });

    if (!sectorEconomico) {
      throw new NotFoundException('Sector economico no encontrado');
    }

    return SectorEconomicoMapper.toDto(sectorEconomico);
  }

  async update(id: number, modificarSectorEconomicoDto: ModificarSectorEconomicoDto): Promise<SectorEconomicoDto> {
    await this.findOne(id);
    const data = SectorEconomicoMapper.toEntity(modificarSectorEconomicoDto);

    const updated = await this.prisma.sector_economico.update({
      where: { sector_economico_id: id },
      data: data as SectorEconomico,
    });

    return SectorEconomicoMapper.toDto(updated);
  }

  async remove(id: number): Promise<SectorEconomicoDto> {
    await this.findOne(id);

    const deleted = await this.prisma.sector_economico.delete({
      where: { sector_economico_id: id },
    });

    return SectorEconomicoMapper.toDto(deleted);
  }
}