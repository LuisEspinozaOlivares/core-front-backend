import { CrearPaisDto, ModificarPaisDto, PaisDto } from '../dto';
import { Pais } from '../entities';

export class PaisMapper {
  static toDto(pais: Pais): PaisDto {
    return {
      id: pais.pais_id,
      nombre: pais.nombre,
      codigoIso: pais.codigo_iso,
    };
  }

  static toEntity(paisDto: CrearPaisDto | ModificarPaisDto): Omit<Pais, 'pais_id'> {
    return {
      nombre: paisDto.nombre,
      codigo_iso: paisDto.codigoIso,
    };
  }
}