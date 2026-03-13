import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ContactoEmpresaDto, CrearContactoEmpresaDto, ModificarContactoEmpresaDto } from '../dto';
import { ContactoEmpresaMapper } from '../mappers';
import { ContactoEmpresa } from '../entities';

@Injectable()
export class ContactoEmpresaService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<ContactoEmpresaDto[]> {
    const contactos = await this.prisma.contacto_empresa.findMany({});
    return contactos.map((c) => ContactoEmpresaMapper.toDto(c));
  }

  async create(dto: CrearContactoEmpresaDto): Promise<ContactoEmpresaDto> {
    const data = ContactoEmpresaMapper.toEntity(dto);
    const created = await this.prisma.contacto_empresa.create({
      data: data as ContactoEmpresa,
    });
    return ContactoEmpresaMapper.toDto(created);
  }

  async findOne(id: number): Promise<ContactoEmpresaDto> {
    const contacto = await this.prisma.contacto_empresa.findUnique({
      where: { contacto_empresa_id: id },
    });

    if (!contacto) {
      throw new NotFoundException(`Contacto no encontrado`);
    }

    return ContactoEmpresaMapper.toDto(contacto);
  }

  async update(id: number, dto: ModificarContactoEmpresaDto): Promise<ContactoEmpresaDto> {
    await this.findOne(id);
    const data = ContactoEmpresaMapper.toEntity(dto);

    const updated = await this.prisma.contacto_empresa.update({
      where: { contacto_empresa_id: id },
      data: data as ContactoEmpresa,
    });

    return ContactoEmpresaMapper.toDto(updated);
  }

  async remove(id: number): Promise<ContactoEmpresaDto> {
    await this.findOne(id);

    const deleted = await this.prisma.contacto_empresa.delete({
      where: { contacto_empresa_id: id },
    });

    return ContactoEmpresaMapper.toDto(deleted);
  }
}
