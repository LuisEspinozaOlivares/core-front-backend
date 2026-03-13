import { DireccionPersonaDto, CrearDireccionPersonaDto, ModificarDireccionPersonaDto } from '../dto';
import { DireccionPersona } from '../entities';

export class DireccionPersonaMapper {
    static toDto(entity: DireccionPersona): DireccionPersonaDto {
        return {
            id: entity.direccion_persona_id,
            personaId: entity.persona_id,
            tipoDireccionId: entity.tipo_direccion_id,
            calle: entity.calle,
            numero: entity.numero,
            bloque: entity.bloque,
            apartamento: entity.apartamento,
            localidadId: entity.localidad_id,
            active: entity.activo ?? true,
            updatedAt: entity.updated_at,
        };
    }

    static toEntity(dto: CrearDireccionPersonaDto | ModificarDireccionPersonaDto): Omit<DireccionPersona, 'direccion_persona_id' | 'updated_at' | 'activo'> {
        return {
            persona_id: dto.personaId!,
            tipo_direccion_id: dto.tipoDireccionId!,
            calle: dto.calle || null,
            numero: dto.numero || null,
            bloque: dto.bloque || null,
            apartamento: dto.apartamento || null,
            localidad_id: dto.localidadId || null,
        };
    }
}
