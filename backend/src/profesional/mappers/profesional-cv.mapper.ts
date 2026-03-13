import { ProfesionalCvDto, CrearProfesionalCvDto, ModificarProfesionalCvDto } from '../dto/profesional-cv';
import { ProfesionalCv } from '../entities/profesional-cv.entity';

export class ProfesionalCvMapper {
  static toDto(entity: ProfesionalCv): ProfesionalCvDto {
    return {
      id: entity.profesional_cv_id,
      profesionalId: entity.profesional_id,
      tipoCvId: entity.tipo_cv_id,
      urlDocumento: entity.url_documento,
      nombreArchivo: entity.nombre_archivo,
      fechaCarga: entity.fecha_carga,
      activo: entity.activo,
    };
  }

  static toEntity(dto: CrearProfesionalCvDto | ModificarProfesionalCvDto): Partial<ProfesionalCv> {
    const entity: Partial<ProfesionalCv> = {};
    if (dto.profesionalId !== undefined) entity.profesional_id = dto.profesionalId;
    if (dto.tipoCvId !== undefined) entity.tipo_cv_id = dto.tipoCvId;
    if (dto.urlDocumento !== undefined) entity.url_documento = dto.urlDocumento;
    if (dto.nombreArchivo !== undefined) entity.nombre_archivo = dto.nombreArchivo;
    return entity;
  }
}
