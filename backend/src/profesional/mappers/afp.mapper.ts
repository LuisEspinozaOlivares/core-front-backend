import { AfpDto, CrearAfpDto, ModificarAfpDto } from '../dto';
import { Afp } from '../entities';

export class AfpMapper {
  static toDto(afp: Afp): AfpDto {
    return {
      id: afp.afp_id,
      nombre: afp.nombre,
      activo: afp.activo,
    };
  }

  static toEntity(dto: CrearAfpDto | ModificarAfpDto): Omit<Afp, 'afp_id'> {
    return {
      nombre: dto.nombre,
      activo: dto.activo ?? true,
    };
  }
}
