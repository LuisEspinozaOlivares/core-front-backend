import { AreaAdministrativa } from '../entities';
import { AreaAdministrativaDto, CrearAreaAdministrativaDto, ModificarAreaAdministrativaDto } from '../dto';

export class AreaAdministrativaMapper {
  static toDto(areaAdministrativa: AreaAdministrativa): AreaAdministrativaDto {
    return {
      id: areaAdministrativa.area_administrativa_id,
      nombre: areaAdministrativa.nombre,
      codigoPostal: areaAdministrativa.codigo_postal,
      tipo: areaAdministrativa.tipo,
      paisId: areaAdministrativa.pais_id,
    };
  }

  static toEntity(dto: CrearAreaAdministrativaDto | ModificarAreaAdministrativaDto): Omit<AreaAdministrativa, 'area_administrativa_id'> {
    return {
      nombre: dto.nombre,
      codigo_postal: dto.codigoPostal,
      tipo: dto.tipo,
      pais_id: dto.paisId,
    };
  }
}