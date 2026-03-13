import { CrearProfesionalDto, ModificarProfesionalDto, ProfesionalDto } from '../dto';
import { Profesional } from '../entities';

export class ProfesionalMapper {
  static toDto(profesional: Profesional): ProfesionalDto {
    return {
      id: profesional.profesional_id,
      personaId: profesional.persona_id,
      empresaId: profesional.empresa_id,
      fechaIngreso: profesional.fecha_ingreso,
      fechaTermino: profesional.fecha_termino,
      estadoProfesionalId: profesional.estado_profesional_id,
      tipoContratoId: profesional.tipo_contrato_id,
      profesionalCargoId: profesional.profesional_cargo_id,
      profesionalAreaId: profesional.profesional_area_id,
      profesionalJefaturaId: profesional.profesional_jefatura_id,
      previsionSaludId: profesional.prevision_salud_id,
      afpId: profesional.afp_id,
      cajaCompensacionId: profesional.caja_compensacion_id,
      activo: profesional.activo ?? true,
      talanaId: profesional.talana_id,
      createdAt: profesional.created_at,
      updatedAt: profesional.updated_at,
    };
  }

  static toEntity(dto: CrearProfesionalDto | ModificarProfesionalDto): Omit<Profesional, 'profesional_id' | 'created_at' | 'updated_at' | 'activo'> {
    return {
      persona_id: dto.personaId,
      empresa_id: dto.empresaId,
      fecha_ingreso: dto.fechaIngreso ? new Date(dto.fechaIngreso) : null,
      fecha_termino: dto.fechaTermino ? new Date(dto.fechaTermino) : null,
      estado_profesional_id: dto.estadoProfesionalId,
      tipo_contrato_id: dto.tipoContratoId || null,
      profesional_cargo_id: dto.profesionalCargoId,
      profesional_area_id: dto.profesionalAreaId,
      profesional_jefatura_id: dto.profesionalJefaturaId || null,
      prevision_salud_id: dto.previsionSaludId || null,
      afp_id: dto.afpId || null,
      caja_compensacion_id: dto.cajaCompensacionId || null,
      talana_id: dto.talanaId || null,
    };
  }
}
