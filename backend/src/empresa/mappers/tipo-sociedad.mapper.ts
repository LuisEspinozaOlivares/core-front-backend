import { CrearTipoSociedadDto, ModificarTipoSociedadDto, TipoSociedadDto } from '../dto';
import { TipoSociedad } from '../entities';

export class TipoSociedadMapper {
  static toDto(tipoSociedad: TipoSociedad): TipoSociedadDto {
    return {
      id: tipoSociedad.tipo_sociedad_id,
      codigo: tipoSociedad.codigo,
      descripcion: tipoSociedad.descripcion,
    };
  }

  static toEntity(dto: CrearTipoSociedadDto | ModificarTipoSociedadDto): Omit<TipoSociedad, 'tipo_sociedad_id'> {
    return {
      codigo: dto.codigo,
      descripcion: dto.descripcion,
    };
  }
}