import { CrearGiroActividadDto, GiroActividadDto, ModificarGiroActividadDto } from '../dto';
import { GiroActividad } from '../entities';

export class GiroActividadMapper {
  static toDto(giroActividad: GiroActividad): GiroActividadDto {
    return {
      id: giroActividad.giro_actividad_id,
      codigo: giroActividad.codigo,
      descripcion: giroActividad.descripcion,
    };
  }

  static toEntity(dto: CrearGiroActividadDto | ModificarGiroActividadDto): Omit<GiroActividad, 'giro_actividad_id'> {
    return {
      codigo: dto.codigo,
      descripcion: dto.descripcion,
    };
  }
}