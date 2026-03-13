import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CrearAmbitoContactoDto, AmbitoContactoDto, ModificarAmbitoContactoDto } from '../dto';
import { AmbitoContactoMapper } from '../mappers';
import { AmbitoContacto } from '../entities';

@Injectable()
export class AmbitoContactoService {
    constructor(private prisma: PrismaService) { }

    async findAll(): Promise<AmbitoContactoDto[]> {
        const list = await this.prisma.ambito_contacto.findMany();
        return list.map((ambitoContacto: AmbitoContacto) => AmbitoContactoMapper.toDto(ambitoContacto));
    }

    async create(crearAmbitoContactoDto: CrearAmbitoContactoDto): Promise<AmbitoContactoDto> {
        const data = AmbitoContactoMapper.toEntity(crearAmbitoContactoDto);

        const created = await this.prisma.ambito_contacto.create({
            data: data as AmbitoContacto,
        });

        return AmbitoContactoMapper.toDto(created);
    }

    async findOne(id: number): Promise<AmbitoContactoDto> {
        const ambitoContacto = await this.prisma.ambito_contacto.findUnique({
            where: { ambito_contacto_id: id },
        });

        if (!ambitoContacto) {
            throw new NotFoundException('Ambito de contacto not found');
        }

        return AmbitoContactoMapper.toDto(ambitoContacto);
    }

    async update(id: number, modificarAmbitoContactoDto: ModificarAmbitoContactoDto): Promise<AmbitoContactoDto> {
        await this.findOne(id);
        const data = AmbitoContactoMapper.toEntity(modificarAmbitoContactoDto);

        const updated = await this.prisma.ambito_contacto.update({
            where: { ambito_contacto_id: id },
            data: data as AmbitoContacto,
        });

        return AmbitoContactoMapper.toDto(updated);
    }

    async remove(id: number): Promise<AmbitoContactoDto> {
        await this.findOne(id);

        const deleted = await this.prisma.ambito_contacto.delete({
            where: { ambito_contacto_id: id },
        });

        return AmbitoContactoMapper.toDto(deleted);
    }
}
