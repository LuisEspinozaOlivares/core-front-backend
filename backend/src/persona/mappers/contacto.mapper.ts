import { ContactoDto, CrearContactoDto, ModificarContactoDto } from '../dto';
import { Contacto } from '../entities';

export class ContactoMapper {
  static toDto(contacto: Contacto): ContactoDto {
    return {
      id: contacto.contacto_persona_id,
      personaId: contacto.persona_id,
      tipoContactoId: contacto.tipo_contacto_id,
      ambitoContactoId: contacto.ambito_contacto_id,
      valor: contacto.valor,
      principal: contacto.principal,
      activo: contacto.activo,
    };
  }

  static toEntity(dto: CrearContactoDto | ModificarContactoDto): Omit<Contacto, 'contacto_persona_id'> {
    return {
      persona_id: dto.personaId!,
      tipo_contacto_id: dto.tipoContactoId!,
      ambito_contacto_id: dto.ambitoContactoId!,
      valor: dto.valor!,
      principal: dto.principal ?? false,
      activo: dto.activo ?? true,
    };
  }
}
