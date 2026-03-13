import { BaseMapper } from '@/src/common/base.mapper';
import { EmpresaEntity } from '../types/empresa.types';
import { EmpresaDTO } from '../dto/empresa.dto';

export class EmpresaMapper implements BaseMapper<EmpresaEntity, EmpresaDTO> {

  toDTO(entity: EmpresaEntity): EmpresaDTO {
    return {
      id: entity.id,
      nombreComercial: entity.nombreComercial ?? undefined,
      rut: entity.rutEmpresa,
      razonSocial: entity.razonSocial,
      sitioWeb: entity.sitioWeb ?? undefined,
      giroActividadId: entity.giroActividadId ?? undefined,
      tipoSociedadId: entity.tipoSociedadId ?? undefined,
      sectorEconomicoId: entity.sectorEconomicoId ?? undefined,
      activo: entity.active,
      contactos: [],
      ubicaciones: [],
      rolesIds: [],
    };
  }

  toEntity(dto: EmpresaDTO): Partial<EmpresaEntity> {
    // Envía solo los campos que acepta CrearEmpresaDto / ModificarEmpresaDto (camelCase)
    return {
      rutEmpresa: dto.rut,
      nombreComercial: dto.nombreComercial,
      razonSocial: dto.razonSocial,
      sitioWeb: dto.sitioWeb,
      giroActividadId: dto.giroActividadId,
      tipoSociedadId: dto.tipoSociedadId,
      sectorEconomicoId: dto.sectorEconomicoId,
    };
  }
}

export const empresaMapper = new EmpresaMapper();
