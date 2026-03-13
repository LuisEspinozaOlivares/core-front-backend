import { BaseMapper } from '@/src/common/base.mapper';
import { ProfesionalEntity } from '../types/profesional.types';
import { ProfesionalDTO } from '../dto/profesional.dto';

export class ProfesionalMapper implements BaseMapper<ProfesionalEntity, ProfesionalDTO> {

  toDTO(entity: ProfesionalEntity): ProfesionalDTO {
    return {
      id: entity.id,
      personaId: entity.personaId,
      empresaId: entity.empresaId,
      fechaIngreso: entity.fechaIngreso ?? undefined,
      fechaTermino: entity.fechaTermino ?? undefined,
      estadoId: entity.estadoProfesionalId,
      tipoContratoId: entity.tipoContratoId ?? 0,
      cargoId: entity.profesionalCargoId,
      areaId: entity.profesionalAreaId,
      jefaturaId: entity.profesionalJefaturaId ?? undefined,
      cvId: undefined,
      previsionSaludId: entity.previsionSaludId ?? 0,
      afpId: entity.afpId ?? 0,
      cajaCompensacionId: entity.cajaCompensacionId ?? 0,
      activo: entity.activo,
    };
  }

  toEntity(dto: ProfesionalDTO): Partial<ProfesionalEntity> {
    // Envía solo los campos que acepta CrearProfesionalDto / ModificarProfesionalDto (camelCase)
    return {
      personaId: dto.personaId,
      empresaId: dto.empresaId,
      fechaIngreso: dto.fechaIngreso ?? undefined,
      fechaTermino: dto.fechaTermino ?? undefined,
      estadoProfesionalId: dto.estadoId,
      tipoContratoId: dto.tipoContratoId,
      profesionalCargoId: dto.cargoId,
      profesionalAreaId: dto.areaId,
      profesionalJefaturaId: dto.jefaturaId ?? undefined,
      previsionSaludId: dto.previsionSaludId,
      afpId: dto.afpId,
      cajaCompensacionId: dto.cajaCompensacionId,
    };
  }
}

export const profesionalMapper = new ProfesionalMapper();
