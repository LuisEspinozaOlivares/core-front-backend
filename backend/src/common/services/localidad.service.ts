import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CrearLocalidadDto, CrearPaisDto, LocalidadDto, ModificarLocalidadDto, ModificarPaisDto, PaisDto } from '../dto';
import { LocalidadMapper, PaisMapper } from '../mappers';
import { Localidad, Pais } from '../entities';

@Injectable()
export class LocalidadService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<LocalidadDto[]> {
    const list = await this.prisma.localidad.findMany();
    return list.map((item: Localidad) => LocalidadMapper.toDto(item));
  }

  async create(crearLocalidadDto: CrearLocalidadDto): Promise<LocalidadDto> {
    const data = LocalidadMapper.toEntity(crearLocalidadDto);

    const areaAdministrativa = await this.prisma.area_administrativa.findUnique({
      where: { area_administrativa_id: data.area_administrativa_id },
    });

    if (!areaAdministrativa) {
      throw new BadRequestException('Area administrativa no encontrada');
    }

    const created = await this.prisma.localidad.create({
      data: data as Localidad,
    });

    return LocalidadMapper.toDto(created);
  }

  async findOne(id: number): Promise<LocalidadDto> {
    const localidad = await this.prisma.localidad.findUnique({
      where: { localidad_id: id },
    });

    if (!localidad) {
      throw new NotFoundException('Localidad no encontrada');
    }

    return LocalidadMapper.toDto(localidad);
  }

  async update(id: number, modificarLocalidadDto: ModificarLocalidadDto): Promise<LocalidadDto> {
    await this.findOne(id);
    const data = LocalidadMapper.toEntity(modificarLocalidadDto);

    const updated = await this.prisma.localidad.update({
      where: { localidad_id: id },
      data: data as Localidad,
    });

    return LocalidadMapper.toDto(updated);
  }

  async remove(id: number): Promise<LocalidadDto> {
    await this.findOne(id);

    const deleted = await this.prisma.localidad.delete({
      where: { localidad_id: id },
    });

    return LocalidadMapper.toDto(deleted);
  }
}
