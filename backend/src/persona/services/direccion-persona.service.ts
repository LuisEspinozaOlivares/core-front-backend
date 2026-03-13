import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CrearDireccionPersonaDto, DireccionPersonaDto, ModificarDireccionPersonaDto } from '../dto';
import { DireccionPersonaMapper } from '../mappers';
import { DireccionPersona } from '../entities';

@Injectable()
export class DireccionPersonaService {
    constructor(private prisma: PrismaService) { }

    async findAll(): Promise<DireccionPersonaDto[]> {
        const addresses = await this.prisma.direccion_persona.findMany({
            where: { activo: true },
        });
        return addresses.map((addr: DireccionPersona) => DireccionPersonaMapper.toDto(addr));
    }

    async create(crearDto: CrearDireccionPersonaDto): Promise<DireccionPersonaDto> {
        const data = DireccionPersonaMapper.toEntity(crearDto);
        const created = await this.prisma.direccion_persona.create({
            data: {
                ...data,
                activo: crearDto.activo ?? true,
            } as DireccionPersona,
        });
        return DireccionPersonaMapper.toDto(created);
    }

    async findOne(id: number): Promise<DireccionPersonaDto> {
        const address = await this.prisma.direccion_persona.findUnique({
            where: { direccion_persona_id: id, activo: true },
        });

        if (!address) {
            throw new NotFoundException('Dirección de persona no encontrada');
        }

        return DireccionPersonaMapper.toDto(address);
    }

    async update(id: number, modificarDto: ModificarDireccionPersonaDto): Promise<DireccionPersonaDto> {
        await this.findOne(id);
        const data = DireccionPersonaMapper.toEntity(modificarDto);

        const updated = await this.prisma.direccion_persona.update({
            where: { direccion_persona_id: id },
            data: {
                ...data,
                updated_at: new Date(),
            } as DireccionPersona,
        });

        return DireccionPersonaMapper.toDto(updated);
    }

    async remove(id: number): Promise<void> {
        await this.findOne(id);
        await this.prisma.direccion_persona.update({
            where: { direccion_persona_id: id },
            data: { activo: false },
        });
    }
}
