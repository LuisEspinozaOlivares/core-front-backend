import { ContactoEmpresaDto, ContactoEmpresaSimpleDto, CrearContactoEmpresaDto, ModificarContactoEmpresaDto } from '../dto';
import { ContactoEmpresa } from '../entities';

export class ContactoEmpresaMapper {
  static toDto(entity: ContactoEmpresa): ContactoEmpresaDto {
    return {
      id: entity.contacto_empresa_id,
      empresaId: entity.empresa_id,
      tipoContactoId: entity.tipo_contacto_id,
      valorContacto: entity.valor_contacto,
      descripcion: entity.descripcion,
      esPrincipal: entity.es_principal ?? false,
      createdAt: entity.created_at!,
      updatedAt: entity.updated_at!,
    };
  }

  static toEntity(dto: CrearContactoEmpresaDto | ModificarContactoEmpresaDto): Omit<ContactoEmpresa, 'contacto_empresa_id' | 'created_at' | 'updated_at'> {
    return {
      empresa_id: dto.empresaId!,
      tipo_contacto_id: dto.tipoContactoId!,
      valor_contacto: dto.valorContacto!,
      descripcion: dto.descripcion || null,
      es_principal: dto.esPrincipal ?? false,
    };
  }

  static toSimpleDto(entity: ContactoEmpresa): ContactoEmpresaSimpleDto {
    return {
      id: entity.contacto_empresa_id,
      empresaId: entity.empresa_id,
      tipoContactoId: entity.tipo_contacto_id,
      valorContacto: entity.valor_contacto,
    };
  }
}
