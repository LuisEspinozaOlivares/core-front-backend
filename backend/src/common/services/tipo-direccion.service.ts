import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CrearTipoDireccionDto, ModificarTipoDireccionDto, TipoDireccionDto } from '../dto';
import { TipoDireccion } from '../entities';
import { TipoDireccionMapper } from '../mappers';

@Injectable()
export class TipoDireccionService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<TipoDireccionDto[]> {
    const list = await this.prisma.tipo_direccion.findMany();
    return list.map((item: TipoDireccion) => TipoDireccionMapper.toDto(item));
  }

  async create(crearTipoDireccionDto: CrearTipoDireccionDto): Promise<TipoDireccionDto> {
    const data = TipoDireccionMapper.toEntity(crearTipoDireccionDto);

    const created = await this.prisma.tipo_direccion.create({
      data: data as TipoDireccion,
    });

    return TipoDireccionMapper.toDto(created);
  }

  async findOne(id: number): Promise<TipoDireccionDto> {
    const tipoDireccion = await this.prisma.tipo_direccion.findUnique({
      where: { tipo_direccion_id: id },
    });

    if (!tipoDireccion) {
      throw new NotFoundException('Tipo Direccion no encontrada');
    }

    return TipoDireccionMapper.toDto(tipoDireccion);
  }

  async update(id: number, modificarTipoDireccionDto: ModificarTipoDireccionDto): Promise<TipoDireccionDto> {
    await this.findOne(id);
    const data = TipoDireccionMapper.toEntity(modificarTipoDireccionDto);

    const updated = await this.prisma.tipo_direccion.update({
      where: { tipo_direccion_id: id },
      data: data as TipoDireccion,
    });

    return TipoDireccionMapper.toDto(updated);
  }

  async remove(id: number): Promise<TipoDireccionDto> {
    await this.findOne(id);

    const deleted = await this.prisma.tipo_direccion.delete({
      where: { tipo_direccion_id: id },
    });

    return TipoDireccionMapper.toDto(deleted);
  }
}