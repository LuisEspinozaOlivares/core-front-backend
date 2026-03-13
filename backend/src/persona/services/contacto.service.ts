import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ContactoDto, CrearContactoDto, ModificarContactoDto } from '../dto';
import { ContactoMapper } from '../mappers';
import { Contacto } from '../entities';

@Injectable()
export class ContactoService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<ContactoDto[]> {
    const list = await this.prisma.contacto.findMany();
    return list.map((contacto: Contacto) => ContactoMapper.toDto(contacto));
  }

  async create(crearContactoDto: CrearContactoDto): Promise<ContactoDto> {
    const data = ContactoMapper.toEntity(crearContactoDto);

    const created = await this.prisma.contacto.create({
      data: data as Contacto,
    });

    return ContactoMapper.toDto(created);
  }

  async findOne(id: number): Promise<ContactoDto> {
    const contacto = await this.prisma.contacto.findUnique({
      where: { contacto_persona_id: id },
    });

    if (!contacto) {
      throw new NotFoundException('Contacto no encontrado');
    }

    return ContactoMapper.toDto(contacto);
  }

  async update(id: number, modificarContactoDto: ModificarContactoDto): Promise<ContactoDto> {
    await this.findOne(id);
    const data = ContactoMapper.toEntity(modificarContactoDto);

    const updated = await this.prisma.contacto.update({
      where: { contacto_persona_id: id },
      data: data as Contacto,
    });

    return ContactoMapper.toDto(updated);
  }

  async remove(id: number): Promise<ContactoDto> {
    await this.findOne(id);

    const deleted = await this.prisma.contacto.delete({
      where: { contacto_persona_id: id },
    });

    return ContactoMapper.toDto(deleted);
  }
}
