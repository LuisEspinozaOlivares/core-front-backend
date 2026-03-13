import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CrearEmpresaRolDto, EmpresaRolDto, ModificarEmpresaRolDto } from '../dto';
import { EmpresaRolMapper } from '../mappers';
import { EmpresaRol } from '../entities';

@Injectable()
export class EmpresaRolService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<EmpresaRolDto[]> {
    const list = await this.prisma.empresa_rol.findMany();
    return list.map((item: EmpresaRol) => EmpresaRolMapper.toDto(item));
  }

  async create(crearEmpresaRolDto: CrearEmpresaRolDto): Promise<EmpresaRolDto> {
    const data = EmpresaRolMapper.toEntity(crearEmpresaRolDto);

    const created = await this.prisma.empresa_rol.create({
      data: data as EmpresaRol,
    });

    return EmpresaRolMapper.toDto(created);
  }

  async findOne(id: number): Promise<EmpresaRolDto> {
    const item = await this.prisma.empresa_rol.findUnique({
      where: { empresa_rol_id: id },
    });

    if (!item) {
      throw new NotFoundException('Empresa rol no encontrado');
    }

    return EmpresaRolMapper.toDto(item);
  }

  async update(id: number, modificarEmpresaRolDto: ModificarEmpresaRolDto): Promise<EmpresaRolDto> {
    await this.findOne(id);
    const data = EmpresaRolMapper.toEntity(modificarEmpresaRolDto);

    const updated = await this.prisma.empresa_rol.update({
      where: { empresa_rol_id: id },
      data: data as EmpresaRol,
    });

    return EmpresaRolMapper.toDto(updated);
  }

  async remove(id: number): Promise<EmpresaRolDto> {
    await this.findOne(id);

    const deleted = await this.prisma.empresa_rol.delete({
      where: { empresa_rol_id: id },
    });

    return EmpresaRolMapper.toDto(deleted);
  }
}
