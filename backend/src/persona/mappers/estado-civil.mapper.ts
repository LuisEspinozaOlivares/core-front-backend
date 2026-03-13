import { CrearEstadoCivilDto, ModificarEstadoCivilDto, EstadoCivilDto } from '../dto';
import { EstadoCivil } from '../entities';

export class EstadoCivilMapper {
  static toDto(estadoCivil: EstadoCivil): EstadoCivilDto {
    return {
      id: estadoCivil.estado_civil_id,
      descripcion: estadoCivil.descripcion,
    };
  }

  static toEntity(estadoCivilDto: CrearEstadoCivilDto | ModificarEstadoCivilDto): Omit<EstadoCivil, 'estado_civil_id'> {
    return {
      descripcion: estadoCivilDto.descripcion,
    };
  }
}