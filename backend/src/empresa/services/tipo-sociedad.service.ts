import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CrearTipoSociedadDto, TipoSociedadDto, ModificarTipoSociedadDto } from '../dto';
import { TipoSociedadMapper } from '../mappers';
import { TipoSociedad } from '../entities';

@Injectable()
export class TipoSociedadService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<TipoSociedadDto[]> {
    const list = await this.prisma.tipo_sociedad.findMany();
    return list.map((tipoSociedad: TipoSociedad) => TipoSociedadMapper.toDto(tipoSociedad));
  }

  async create(crearTipoSociedadDto: CrearTipoSociedadDto): Promise<TipoSociedadDto> {
    const data = TipoSociedadMapper.toEntity(crearTipoSociedadDto);

    const created = await this.prisma.tipo_sociedad.create({
      data: data as TipoSociedad,
    });

    return TipoSociedadMapper.toDto(created);
  }

  async findOne(id: number): Promise<TipoSociedadDto> {
    const tipoSociedad = await this.prisma.tipo_sociedad.findUnique({
      where: { tipo_sociedad_id: id },
    });

    if (!tipoSociedad) {
      throw new NotFoundException('Tipo sociedad no encontrado');
    }

    return TipoSociedadMapper.toDto(tipoSociedad);
  }

  async update(id: number, modificarTipoSociedadDto: ModificarTipoSociedadDto): Promise<TipoSociedadDto> {
    await this.findOne(id);
    const data = TipoSociedadMapper.toEntity(modificarTipoSociedadDto);

    const updated = await this.prisma.tipo_sociedad.update({
      where: { tipo_sociedad_id: id },
      data: data as TipoSociedad,
    });

    return TipoSociedadMapper.toDto(updated);
  }

  async remove(id: number): Promise<TipoSociedadDto> {
    await this.findOne(id);

    const deleted = await this.prisma.tipo_sociedad.delete({
      where: { tipo_sociedad_id: id },
    });

    return TipoSociedadMapper.toDto(deleted);
  }
}