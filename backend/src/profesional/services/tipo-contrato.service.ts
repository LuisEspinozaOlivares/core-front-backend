import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TipoContratoDto, CrearTipoContratoDto, ModificarTipoContratoDto } from '../dto';
import { TipoContratoMapper } from '../mappers';
import { TipoContrato } from '../entities';

@Injectable()
export class TipoContratoService {
    constructor(private prisma: PrismaService) { }

    async findAll(): Promise<TipoContratoDto[]> {
        const list = await this.prisma.tipo_contrato.findMany();
        return list.map((item: TipoContrato) => TipoContratoMapper.toDto(item));
    }

    async create(crearDto: CrearTipoContratoDto): Promise<TipoContratoDto> {
        const data = TipoContratoMapper.toEntity(crearDto);

        const created = await this.prisma.tipo_contrato.create({
            data: data as TipoContrato,
        });

        return TipoContratoMapper.toDto(created);
    }

    async findOne(id: number): Promise<TipoContratoDto> {
        const item = await this.prisma.tipo_contrato.findUnique({
            where: { tipo_contrato_id: id },
        });

        if (!item) {
            throw new NotFoundException('Tipo de contrato no encontrado');
        }

        return TipoContratoMapper.toDto(item);
    }

    async update(id: number, modificarDto: ModificarTipoContratoDto): Promise<TipoContratoDto> {
        await this.findOne(id);
        const data = TipoContratoMapper.toEntity(modificarDto);

        const updated = await this.prisma.tipo_contrato.update({
            where: { tipo_contrato_id: id },
            data: data as TipoContrato,
        });

        return TipoContratoMapper.toDto(updated);
    }

    async remove(id: number): Promise<TipoContratoDto> {
        await this.findOne(id);

        const deleted = await this.prisma.tipo_contrato.delete({
            where: { tipo_contrato_id: id },
        });

        return TipoContratoMapper.toDto(deleted);
    }
}
