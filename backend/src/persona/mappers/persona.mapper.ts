import { CrearPersonaDto, PersonaDto } from '../dto';
import { ModificarPersonaDto } from '../dto/persona/modificar-persona.dto';
import { Persona } from '../entities';

export class PersonaMapper {
  static toDto(persona: Persona): PersonaDto {
    return {
      id: persona.persona_id,
      tipoIdentificacionId: persona.tipo_identificacion_id,
      numeroIdentificacion: persona.numero_identificacion,
      nombresPersona: persona.nombres_persona,
      primerApellido: persona.primer_apellido,
      segundoApellido: persona.segundo_apellido,
      fechaNacimiento: persona.fecha_nacimiento,
      nacionalidadId: persona.nacionalidad_id,
      generoId: persona.genero_id,
      estadoCivilId: persona.estado_civil_id,
      paisOrigenId: persona.pais_origen_id,
      paisResidenciaId: persona.pais_residencia_id,
      createdAt: persona.created_at,
      updatedAt: persona.updated_at,
      createdBy: persona.created_by,
      updatedBy: persona.updated_by,
      active: persona.activo ?? true,
    };
  }

  static toEntity(dto: CrearPersonaDto | ModificarPersonaDto): Omit<Persona, 'persona_id' | 'created_at' | 'updated_at' | 'activo'> {
    return {
      tipo_identificacion_id: dto.tipoIdentificacionId,
      numero_identificacion: dto.numeroIdentificacion,
      nombres_persona: dto.nombresPersona,
      primer_apellido: dto.primerApellido,
      segundo_apellido: dto.segundoApellido,
      fecha_nacimiento: dto.fechaNacimiento ? new Date(dto.fechaNacimiento) : null,
      nacionalidad_id: dto.nacionalidadId || null,
      genero_id: dto.generoId || null,
      estado_civil_id: dto.estadoCivilId || null,
      pais_origen_id: dto.paisOrigenId || null,
      pais_residencia_id: dto.paisResidenciaId || null,
      created_by: null,
      updated_by: null,
    };
  }
}
