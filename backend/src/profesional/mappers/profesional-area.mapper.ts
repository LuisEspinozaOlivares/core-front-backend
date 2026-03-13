import { ProfesionalAreaDto, CrearProfesionalAreaDto, ModificarProfesionalAreaDto } from '../dto/profesional-area';
import { ProfesionalArea } from '../entities';

export class ProfesionalAreaMapper {
  static toDto(entity: ProfesionalArea): ProfesionalAreaDto {
    return {
      profesionalAreaId: entity.profesional_area_id,
      nombreArea: entity.nombre_area,
    };
  }

  static toEntity(dto: CrearProfesionalAreaDto | ModificarProfesionalAreaDto): Omit<ProfesionalArea, 'profesional_area_id'> {
    return {
      nombre_area: dto.nombreArea,
    };
  }
}
