import { CrearPrevisionSaludDto, PrevisionSaludDto, ModificarPrevisionSaludDto } from '../dto';
import { PrevisionSalud } from '../entities';

export class PrevisionSaludMapper {
  static toEntity(dto: CrearPrevisionSaludDto | ModificarPrevisionSaludDto): Omit<PrevisionSalud, 'prevision_salud_id'> {
    return {
      nombre: dto.nombre,
      tipo: dto.tipo,
      activo: dto.activo ?? true,
    };
  }

  static toDto(entity: PrevisionSalud): PrevisionSaludDto {
    return {
      id: entity.prevision_salud_id,
      nombre: entity.nombre,
      tipo: entity.tipo,
      activo: entity.activo,
    };
  }
}
