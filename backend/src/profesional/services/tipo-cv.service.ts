import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CrearTipoCvDto, TipoCvDto, ModificarTipoCvDto } from '../dto/tipo-cv';
import { TipoCvMapper } from '../mappers/tipo-cv.mapper';
import { TipoCv } from '../entities/tipo_cv.entity';

@Injectable()
export class TipoCvService {
    constructor(private prisma: PrismaService) { }

    async findAll(): Promise<TipoCvDto[]> {
        const list = await this.prisma.tipo_cv.findMany();
        return list.map((item: TipoCv) => TipoCvMapper.toDto(item));
    }

    async create(crearDto: CrearTipoCvDto): Promise<TipoCvDto> {
        const data = TipoCvMapper.toEntity(crearDto);

        const created = await this.prisma.tipo_cv.create({
            data: data as TipoCv,
        });

        return TipoCvMapper.toDto(created);
    }

    async findOne(id: number): Promise<TipoCvDto> {
        const item = await this.prisma.tipo_cv.findUnique({
            where: { tipo_cv_id: id },
        });

        if (!item) {
            throw new NotFoundException('Tipo CV no encontrado');
        }

        return TipoCvMapper.toDto(item);
    }

    async update(id: number, modificarDto: ModificarTipoCvDto): Promise<TipoCvDto> {
        await this.findOne(id);
        const data = TipoCvMapper.toEntity(modificarDto);

        const updated = await this.prisma.tipo_cv.update({
            where: { tipo_cv_id: id },
            data: data as TipoCv,
        });

        return TipoCvMapper.toDto(updated);
    }

    async remove(id: number): Promise<TipoCvDto> {
        await this.findOne(id);

        const deleted = await this.prisma.tipo_cv.delete({
            where: { tipo_cv_id: id },
        });

        return TipoCvMapper.toDto(deleted);
    }
}
