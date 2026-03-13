import { CrearLocalidadDto, LocalidadDto } from '../dto';
import { Localidad } from '../entities';

export class LocalidadMapper {
  static toDto(entity: Localidad): LocalidadDto {
    return {
      id: entity.localidad_id,
      nombre: entity.nombre,
      codigoPostal: entity.codigo_postal,
      areaAdministrativaId: entity.area_administrativa_id,
    };
  }

  static toEntity(dto: CrearLocalidadDto): Omit<Localidad, 'localidad_id'> {
    return {
      nombre: dto.nombre,
      codigo_postal: dto.codigoPostal,
      area_administrativa_id: dto.areaAdministrativaId,
    };
  }
}