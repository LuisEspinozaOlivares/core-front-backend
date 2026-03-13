import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CrearAfpDto, AfpDto, ModificarAfpDto } from '../dto';
import { AfpMapper } from '../mappers';
import { Afp } from '../entities';

@Injectable()
export class AfpService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<AfpDto[]> {
    const list = await this.prisma.afp.findMany();
    return list.map((afp: Afp) => AfpMapper.toDto(afp));
  }

  async create(crearAfpDto: CrearAfpDto): Promise<AfpDto> {
    const data = AfpMapper.toEntity(crearAfpDto);

    const created = await this.prisma.afp.create({
      data: data as Afp,
    });

    return AfpMapper.toDto(created);
  }

  async findOne(id: number): Promise<AfpDto> {
    const afp = await this.prisma.afp.findUnique({
      where: { afp_id: id },
    });

    if (!afp) {
      throw new NotFoundException('AFP no encontrada');
    }

    return AfpMapper.toDto(afp);
  }

  async update(id: number, modificarAfpDto: ModificarAfpDto): Promise<AfpDto> {
    await this.findOne(id);
    const data = AfpMapper.toEntity(modificarAfpDto);

    const updated = await this.prisma.afp.update({
      where: { afp_id: id },
      data: data as Afp,
    });

    return AfpMapper.toDto(updated);
  }

  async remove(id: number): Promise<AfpDto> {
    await this.findOne(id);

    const deleted = await this.prisma.afp.delete({
      where: { afp_id: id },
    });

    return AfpMapper.toDto(deleted);
  }
}
