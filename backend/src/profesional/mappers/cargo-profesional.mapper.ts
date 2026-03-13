import { CargoProfesionalDto, CrearCargoProfesionalDto, ModificarCargoProfesionalDto } from '../dto';
import { CargoProfesional } from '../entities';

export class CargoProfesionalMapper {
  static toDto(entity: CargoProfesional): CargoProfesionalDto {
    return {
      id: entity.profesional_cargo_id,
      nombreCargo: entity.nombre_cargo,
      descripcion: entity.descripcion ?? undefined,
      activo: entity.activo ?? true,
    };
  }

  static toEntity(dto: CrearCargoProfesionalDto | ModificarCargoProfesionalDto): Omit<CargoProfesional, 'profesional_cargo_id'> {
    return {
      nombre_cargo: dto.nombreCargo,
      descripcion: dto.descripcion ?? null,
      activo: dto.activo ?? true,
    };
  }
}
