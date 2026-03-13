import { CrearTipoIdentificacionDto, ModificarTipoIdentificacionDto, TipoIdentificacionDto } from '../dto';
import { TipoIdentificacion } from '../entities';

export class TipoIdentificacionMapper {
  static toDto(tipoIdentificacion: TipoIdentificacion): TipoIdentificacionDto {
    return {
      id: tipoIdentificacion.tipo_identificacion_id,
      codigo: tipoIdentificacion.codigo,
      descripcion: tipoIdentificacion.descripcion,
    };
  }

  static toEntity(tipoIdentificacionDto: CrearTipoIdentificacionDto | ModificarTipoIdentificacionDto): Omit<TipoIdentificacion, 'tipo_identificacion_id'> {
    return {
      codigo: tipoIdentificacionDto.codigo,
      descripcion: tipoIdentificacionDto.descripcion,
    };
  }
}