import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CrearPersonaDto, PersonaDto, ModificarPersonaDto } from '../dto';
import { PersonaMapper } from '../mappers';
import { PaginationRequestDto, PaginationResponseDto } from '../../common/dto';
import { Persona } from '../entities';

@Injectable()
export class PersonaService {
  constructor(private prisma: PrismaService) { }

  async findAll(paginationDto: PaginationRequestDto): Promise<PaginationResponseDto<PersonaDto>> {
    const { page = 1, limit = 10 } = paginationDto;
    const total = await this.prisma.persona.count();
    const lastPage = Math.ceil(total / limit);

    const personas = await this.prisma.persona.findMany({
      where: { activo: true },
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      data: personas.map((persona: Persona) => PersonaMapper.toDto(persona)),
      page,
      total,
      lastPage,
    };
  }

  async create(crearPersonaDto: CrearPersonaDto): Promise<PersonaDto> {
    const data = PersonaMapper.toEntity(crearPersonaDto);

    const created = await this.prisma.persona.create({
      data: data as Persona,
    });

    return PersonaMapper.toDto(created);
  }

  async findOne(id: number): Promise<PersonaDto> {
    const person = await this.prisma.persona.findUnique({
      where: { persona_id: id, activo: true },
    });

    if (!person) {
      throw new NotFoundException('Person not found');
    }

    return PersonaMapper.toDto(person);
  }

  async update(id: number, modificarPersonaDto: ModificarPersonaDto): Promise<PersonaDto> {
    await this.findOne(id);
    const data = PersonaMapper.toEntity(modificarPersonaDto);

    const updated = await this.prisma.persona.update({
      where: { persona_id: id, activo: true },
      data: data as Persona,
    });

    return PersonaMapper.toDto(updated);
  }

  async remove(id: number): Promise<PersonaDto> {
    await this.findOne(id);

    const deleted = await this.prisma.persona.update({
      where: { persona_id: id },
      data: { activo: false },
    });

    return PersonaMapper.toDto(deleted);
  }
}
