import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CrearEmpresaDto, EmpresaDto, EmpresaSimpleDto, ModificarEmpresaDto } from '../dto';
import { EmpresaMapper } from '../mappers';
import { Empresa, EmpresaSimple } from '../entities';
import { PaginationRequestDto, PaginationResponseDto } from '../../common/dto';
import { FiltroBusquedaDto } from 'src/common/dto/filtro/filtro-busqueda.dto';

@Injectable()
export class EmpresaService {
  constructor(private prisma: PrismaService) { }

  async findAll(paginationDto: PaginationRequestDto): Promise<PaginationResponseDto<EmpresaDto>> {
    const { page = 1, limit = 10 } = paginationDto;
    const total = await this.prisma.empresa.count();
    const lastPage = Math.ceil(total / limit);

    const empresas = await this.prisma.empresa.findMany({
      where: { activo: true },
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      data: empresas.map((empresa: Empresa) => EmpresaMapper.toDto(empresa)),
      page,
      total,
      lastPage,
    };
  }

  async findAllWithSearch(filtroBusqueda: FiltroBusquedaDto): Promise<EmpresaSimpleDto[]> {
    console.log({ filtroBusqueda: filtroBusqueda.busqueda });
    const empresas = await this.prisma.empresa.findMany({
      orderBy: {
        razon_social: 'asc',
      },
      where: { 
        activo: true,
        OR: [
          {
            rut_empresa: {
              contains: filtroBusqueda.busqueda,
              mode: 'insensitive',
            },
          },
          {
            razon_social: {
              contains: filtroBusqueda.busqueda,
              mode: 'insensitive',
            },
          }
        ]
      },
      select: {
        empresa_id: true,
        rut_empresa: true,
        razon_social: true,
      },
    });

    return empresas.map((empresa: unknown) => EmpresaMapper.toSimpleDto(empresa as EmpresaSimple));
  }

  async findAllWithContacts(ids: number[]): Promise<EmpresaSimpleDto[]> {
    const empresas = await this.prisma.empresa.findMany({
      orderBy: {
        razon_social: 'asc',
      },
      where: { activo: true, empresa_id: { in: ids } },
      select: {
        empresa_id: true,
        rut_empresa: true,
        razon_social: true,
        contacto_empresa: {
          select: {
            contacto_empresa_id: true,
            empresa_id: true,
            tipo_contacto_id: true,
            valor_contacto: true,
          }
        },
      },
    });

    return empresas.map((empresa: unknown) => EmpresaMapper.toSimpleDto(empresa as EmpresaSimple));
  }

  async create(crearEmpresaDto: CrearEmpresaDto): Promise<EmpresaDto> {
    const data = EmpresaMapper.toEntity(crearEmpresaDto);

    const created = await this.prisma.empresa.create({
      data: data as Empresa,
    });

    return EmpresaMapper.toDto(created);
  }

  async findOne(id: number): Promise<EmpresaDto> {
    const empresa = await this.prisma.empresa.findUnique({
      where: { empresa_id: id, activo: true },
    });

    if (!empresa) {
      throw new NotFoundException('Company not found');
    }

    return EmpresaMapper.toDto(empresa);
  }

  async update(id: number, modificarEmpresaDto: ModificarEmpresaDto): Promise<EmpresaDto> {
    await this.findOne(id);
    const data = EmpresaMapper.toEntity(modificarEmpresaDto);

    const updated = await this.prisma.empresa.update({
      where: { empresa_id: id, activo: true },
      data: data as Empresa,
    });

    return EmpresaMapper.toDto(updated);
  }

  async remove(id: number): Promise<EmpresaDto> {
    await this.findOne(id);

    const deleted = await this.prisma.empresa.update({
      where: { empresa_id: id },
      data: { activo: false },
    });

    return EmpresaMapper.toDto(deleted);
  }
}
