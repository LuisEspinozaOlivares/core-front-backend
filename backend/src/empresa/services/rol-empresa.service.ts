import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RolEmpresaDto, CrearRolEmpresaDto, ModificarRolEmpresaDto } from '../dto';
import { RolEmpresaMapper } from '../mappers';
import { RolEmpresa } from '../entities';

@Injectable()
export class RolEmpresaService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<RolEmpresaDto[]> {
    const roles = await this.prisma.rol_empresa.findMany({});
    return roles.map((r) => RolEmpresaMapper.toDto(r));
  }

  async create(dto: CrearRolEmpresaDto): Promise<RolEmpresaDto> {
    const data = RolEmpresaMapper.toEntity(dto);
    const created = await this.prisma.rol_empresa.create({
      data: data as RolEmpresa,
    });
    return RolEmpresaMapper.toDto(created);
  }

  async findOne(id: number): Promise<RolEmpresaDto> {
    const rol = await this.prisma.rol_empresa.findUnique({
      where: { rol_empresa_id: id },
    });

    if (!rol) {
      throw new NotFoundException(`Rol de empresa no encontrado`);
    }

    return RolEmpresaMapper.toDto(rol);
  }

  async update(id: number, dto: ModificarRolEmpresaDto): Promise<RolEmpresaDto> {
    await this.findOne(id);
    const data = RolEmpresaMapper.toEntity(dto);

    const updated = await this.prisma.rol_empresa.update({
      where: { rol_empresa_id: id },
      data: data as Partial<RolEmpresa>,
    });

    return RolEmpresaMapper.toDto(updated);
  }

  async remove(id: number): Promise<RolEmpresaDto> {
    await this.findOne(id);

    const deleted = await this.prisma.rol_empresa.delete({
      where: { rol_empresa_id: id },
    });

    return RolEmpresaMapper.toDto(deleted);
  }
}
