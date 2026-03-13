import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CrearTipoContactoDto, ModificarTipoContactoDto, TipoContactoDto } from '../dto';
import { TipoContacto } from '../entities';
import { TipoContactoMapper } from '../mappers';

@Injectable()
export class TipoContactoService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(): Promise<TipoContactoDto[]> {
    const list = await this.prisma.tipo_contacto.findMany();
    return list.map((item: TipoContacto) => TipoContactoMapper.toDto(item));
  }

  async create(crearTipoContactoDto: CrearTipoContactoDto): Promise<TipoContactoDto> {
    const data = TipoContactoMapper.toEntity(crearTipoContactoDto);

    const created = await this.prisma.tipo_contacto.create({
      data: data as TipoContacto,
    });

    return TipoContactoMapper.toDto(created);
  }

  async findOne(id: number): Promise<TipoContactoDto> {
    const tipoContacto = await this.prisma.tipo_contacto.findUnique({
      where: { tipo_contacto_id: id },
    });

    if (!tipoContacto) {
      throw new NotFoundException('Tipo Contacto no encontrado');
    }

    return TipoContactoMapper.toDto(tipoContacto);
  }

  async update(id: number, modificarTipoContactoDto: ModificarTipoContactoDto): Promise<TipoContactoDto> {
    await this.findOne(id);
    const data = TipoContactoMapper.toEntity(modificarTipoContactoDto);

    const updated = await this.prisma.tipo_contacto.update({
      where: { tipo_contacto_id: id },
      data: data as TipoContacto,
    });

    return TipoContactoMapper.toDto(updated);
  }

  async remove(id: number): Promise<TipoContactoDto> {
    await this.findOne(id);

    const deleted = await this.prisma.tipo_contacto.delete({
      where: { tipo_contacto_id: id },
    });

    return TipoContactoMapper.toDto(deleted);
  }
}