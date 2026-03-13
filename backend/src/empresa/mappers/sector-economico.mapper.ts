import { CrearSectorEconomicoDto, ModificarSectorEconomicoDto, SectorEconomicoDto } from '../dto';
import { SectorEconomico } from '../entities';

export class SectorEconomicoMapper {
  static toDto(sectorEconomico: SectorEconomico): SectorEconomicoDto {
    return {
      id: sectorEconomico.sector_economico_id,
      nombreSector: sectorEconomico.nombre_sector,
      descripcion: sectorEconomico.descripcion,
    };
  }

  static toEntity(dto: CrearSectorEconomicoDto | ModificarSectorEconomicoDto): Omit<SectorEconomico, 'sector_economico_id'> {
    return {
      nombre_sector: dto.nombreSector,
      descripcion: dto.descripcion,
    };
  }
}