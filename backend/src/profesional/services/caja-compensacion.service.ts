import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CrearCajaCompensacionDto, CajaCompensacionDto, ModificarCajaCompensacionDto } from '../dto';
import { CajaCompensacionMapper } from '../mappers';
import { CajaCompensacion } from '../entities';

@Injectable()
export class CajaCompensacionService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<CajaCompensacionDto[]> {
    const list = await this.prisma.caja_compensacion.findMany();
    return list.map((caja: CajaCompensacion) => CajaCompensacionMapper.toDto(caja));
  }

  async create(crearCajaCompensacionDto: CrearCajaCompensacionDto): Promise<CajaCompensacionDto> {
    const data = CajaCompensacionMapper.toEntity(crearCajaCompensacionDto);

    const created = await this.prisma.caja_compensacion.create({
      data: data as CajaCompensacion,
    });

    return CajaCompensacionMapper.toDto(created);
  }

  async findOne(id: number): Promise<CajaCompensacionDto> {
    const caja = await this.prisma.caja_compensacion.findUnique({
      where: { caja_compensacion_id: id },
    });

    if (!caja) {
      throw new NotFoundException('Caja de compensación no encontrada');
    }

    return CajaCompensacionMapper.toDto(caja);
  }

  async update(id: number, modificarCajaCompensacionDto: ModificarCajaCompensacionDto): Promise<CajaCompensacionDto> {
    await this.findOne(id);
    const data = CajaCompensacionMapper.toEntity(modificarCajaCompensacionDto);

    const updated = await this.prisma.caja_compensacion.update({
      where: { caja_compensacion_id: id },
      data: data as CajaCompensacion,
    });

    return CajaCompensacionMapper.toDto(updated);
  }

  async remove(id: number): Promise<CajaCompensacionDto> {
    await this.findOne(id);

    const deleted = await this.prisma.caja_compensacion.delete({
      where: { caja_compensacion_id: id },
    });

    return CajaCompensacionMapper.toDto(deleted);
  }
}
