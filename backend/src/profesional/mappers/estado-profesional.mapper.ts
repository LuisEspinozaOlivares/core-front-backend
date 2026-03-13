import { EstadoProfesionalDto, CrearEstadoProfesionalDto, ModificarEstadoProfesionalDto } from '../dto/estado-profesional';
import { EstadoProfesional } from '../entities/estado-profesional.entity';

export class EstadoProfesionalMapper {
  static toDto(entity: EstadoProfesional): EstadoProfesionalDto {
    return {
      id: entity.estado_profesional_id,
      codigo: entity.codigo,
      descripcion: entity.descripcion,
    };
  }

  static toEntity(dto: CrearEstadoProfesionalDto | ModificarEstadoProfesionalDto): Partial<EstadoProfesional> {
    const entity: Partial<EstadoProfesional> = {};
    if (dto.codigo !== undefined) entity.codigo = dto.codigo;
    if (dto.descripcion !== undefined) entity.descripcion = dto.descripcion;
    return entity;
  }
}
