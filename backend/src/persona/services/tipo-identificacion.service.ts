import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CrearTipoIdentificacionDto, ModificarTipoIdentificacionDto, TipoIdentificacionDto } from '../dto';
import { TipoIdentificacionMapper } from '../mappers';
import { TipoIdentificacion } from '../entities';

@Injectable()
export class TipoIdentificacionService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<TipoIdentificacionDto[]> {
    const list = await this.prisma.tipo_identificacion.findMany();
    return list.map((item: TipoIdentificacion) => TipoIdentificacionMapper.toDto(item));
  }

  async create(crearTipoIdentificacionDto: CrearTipoIdentificacionDto): Promise<TipoIdentificacionDto> {
    const data = TipoIdentificacionMapper.toEntity(crearTipoIdentificacionDto);

    const created = await this.prisma.tipo_identificacion.create({
      data: data as TipoIdentificacion,
    });

    return TipoIdentificacionMapper.toDto(created);
  }

  async findOne(id: number): Promise<TipoIdentificacionDto> {
    const tipoIdentificacion = await this.prisma.tipo_identificacion.findUnique({
      where: { tipo_identificacion_id: id },
    });

    if (!tipoIdentificacion) {
      throw new NotFoundException('Tipo identificacion not found');
    }

    return TipoIdentificacionMapper.toDto(tipoIdentificacion);
  }

  async update(id: number, modificarTipoIdentificacionDto: ModificarTipoIdentificacionDto): Promise<TipoIdentificacionDto> {
    await this.findOne(id);
    const data = TipoIdentificacionMapper.toEntity(modificarTipoIdentificacionDto);

    const updated = await this.prisma.tipo_identificacion.update({
      where: { tipo_identificacion_id: id },
      data: data as TipoIdentificacion,
    });

    return TipoIdentificacionMapper.toDto(updated);
  }

  async remove(id: number): Promise<TipoIdentificacionDto> {
    await this.findOne(id);

    const deleted = await this.prisma.tipo_identificacion.delete({
      where: { tipo_identificacion_id: id },
    });

    return TipoIdentificacionMapper.toDto(deleted);
  }
}
