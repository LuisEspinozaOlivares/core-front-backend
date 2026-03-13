import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProfesionalCvDto, CrearProfesionalCvDto, ModificarProfesionalCvDto } from '../dto/profesional-cv';
import { ProfesionalCvMapper } from '../mappers/profesional-cv.mapper';
import { ProfesionalCv } from '../entities/profesional-cv.entity';

@Injectable()
export class ProfesionalCvService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<ProfesionalCvDto[]> {
    const list = await this.prisma.profesional_cv.findMany();
    return list.map((item: ProfesionalCv) => ProfesionalCvMapper.toDto(item));
  }

  async create(crearDto: CrearProfesionalCvDto): Promise<ProfesionalCvDto> {
    const data = ProfesionalCvMapper.toEntity(crearDto);

    const created = await this.prisma.profesional_cv.create({
      data: data as ProfesionalCv,
    });

    return ProfesionalCvMapper.toDto(created as ProfesionalCv);
  }

  async findOne(id: number): Promise<ProfesionalCvDto> {
    const item = await this.prisma.profesional_cv.findUnique({
      where: { profesional_cv_id: id },
    });

    if (!item) {
      throw new NotFoundException('Profesional CV no encontrado');
    }

    return ProfesionalCvMapper.toDto(item as ProfesionalCv);
  }

  async update(id: number, modificarDto: ModificarProfesionalCvDto): Promise<ProfesionalCvDto> {
    await this.findOne(id);
    const data = ProfesionalCvMapper.toEntity(modificarDto);

    const updated = await this.prisma.profesional_cv.update({
      where: { profesional_cv_id: id },
      data: data as ProfesionalCv,
    });

    return ProfesionalCvMapper.toDto(updated as ProfesionalCv);
  }

  async remove(id: number): Promise<ProfesionalCvDto> {
    await this.findOne(id);

    const deleted = await this.prisma.profesional_cv.delete({
      where: { profesional_cv_id: id },
    });

    return ProfesionalCvMapper.toDto(deleted as ProfesionalCv);
  }
}
