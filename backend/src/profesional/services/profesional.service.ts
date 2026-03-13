import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProfesionalDto, CrearProfesionalDto, ModificarProfesionalDto } from '../dto';
import { ProfesionalMapper } from '../mappers';
import { PaginationRequestDto, PaginationResponseDto } from '../../common/dto';
import { Profesional } from '../entities';

@Injectable()
export class ProfesionalService {
  constructor(private prisma: PrismaService) { }

  async findAll(paginationDto: PaginationRequestDto): Promise<PaginationResponseDto<ProfesionalDto>> {
    const { page = 1, limit = 10 } = paginationDto;
    const total = await this.prisma.profesional.count();
    const lastPage = Math.ceil(total / limit);

    const profesionales = await this.prisma.profesional.findMany({
      where: { activo: true },
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      data: profesionales.map((profesional: Profesional) => ProfesionalMapper.toDto(profesional)),
      page,
      total,
      lastPage,
    };
  }

  async create(createProfesionalDto: CrearProfesionalDto): Promise<ProfesionalDto> {
    const persona = await this.prisma.persona.findUnique({
      where: { persona_id: createProfesionalDto.personaId, activo: true },
    });

    if (!persona) {
      throw new BadRequestException('Persona no encontrada')
    };

    const empresa = await this.prisma.empresa.findUnique({
      where: { empresa_id: createProfesionalDto.empresaId, activo: true },
    });

    if (!empresa) {
      throw new BadRequestException('Empresa no encontrada')
    };

    const data = ProfesionalMapper.toEntity(createProfesionalDto);

    const created = await this.prisma.profesional.create({
      data: data as Profesional,
    });

    return ProfesionalMapper.toDto(created);
  }

  async findOne(id: number): Promise<ProfesionalDto> {
    const professional = await this.prisma.profesional.findUnique({
      where: { profesional_id: id, activo: true },
    });

    if (!professional) {
      throw new NotFoundException('Profesional no encontrado')
    };

    return ProfesionalMapper.toDto(professional);
  }

  async update(id: number, modificarProfesionalDto: ModificarProfesionalDto): Promise<ProfesionalDto> {
    await this.findOne(id);

    const data = ProfesionalMapper.toEntity(modificarProfesionalDto);

    const updated = await this.prisma.profesional.update({
      where: { profesional_id: id, activo: true },
      data: data as Profesional,
    });

    return ProfesionalMapper.toDto(updated);
  }

  async remove(id: number): Promise<ProfesionalDto> {
    await this.findOne(id);

    const deleted = await this.prisma.profesional.update({
      where: { profesional_id: id, activo: true },
      data: { activo: false },
    });

    return ProfesionalMapper.toDto(deleted);
  }
}
