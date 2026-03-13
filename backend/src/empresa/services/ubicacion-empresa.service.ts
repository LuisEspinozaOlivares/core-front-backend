import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CrearUbicacionEmpresaDto, UbicacionEmpresaDto, ModificarUbicacionEmpresaDto } from '../dto/ubicacion-empresa';
import { UbicacionEmpresaMapper } from '../mappers/ubicacion-empresa.mapper';
import { UbicacionEmpresa } from '../entities/ubicacion-empresa.entity';


@Injectable()
export class UbicacionEmpresaService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<UbicacionEmpresaDto[]> {
    const ubicaciones = await this.prisma.ubicacion_empresa.findMany({
      where: { activo: true },
    });

    return ubicaciones.map((u: UbicacionEmpresa) => UbicacionEmpresaMapper.toDto(u));
  }

  async create(crearDto: CrearUbicacionEmpresaDto): Promise<UbicacionEmpresaDto> {
    const data = UbicacionEmpresaMapper.toEntity(crearDto);

    const created = await this.prisma.ubicacion_empresa.create({
      data: data as UbicacionEmpresa,
    });

    return UbicacionEmpresaMapper.toDto(created);
  }

  async findOne(id: number): Promise<UbicacionEmpresaDto> {
    const ubicacion = await this.prisma.ubicacion_empresa.findUnique({
      where: { ubicacion_empresa_id: id, activo: true },
    });

    if (!ubicacion) {
      throw new NotFoundException('Company location not found');
    }

    return UbicacionEmpresaMapper.toDto(ubicacion);
  }

  async update(id: number, modificarDto: ModificarUbicacionEmpresaDto): Promise<UbicacionEmpresaDto> {
    await this.findOne(id);
    const data = UbicacionEmpresaMapper.toEntity(modificarDto);

    const updated = await this.prisma.ubicacion_empresa.update({
      where: { ubicacion_empresa_id: id, activo: true },
      data: data as any, // Using any here because partial entity might have issues with strict prisma types if not careful
    });

    return UbicacionEmpresaMapper.toDto(updated);
  }

  async remove(id: number): Promise<UbicacionEmpresaDto> {
    await this.findOne(id);

    const deleted = await this.prisma.ubicacion_empresa.update({
      where: { ubicacion_empresa_id: id },
      data: { activo: false },
    });

    return UbicacionEmpresaMapper.toDto(deleted);
  }
}
