import { TipoDireccion } from '../entities';
import { CrearTipoDireccionDto, ModificarTipoDireccionDto, TipoDireccionDto } from '../dto';

export class TipoDireccionMapper {
  static toDto(tipoDireccion: TipoDireccion): TipoDireccionDto {
    return {
      id: tipoDireccion.tipo_direccion_id,
      descripcion: tipoDireccion.descripcion,
    };
  }

  static toEntity(dto: CrearTipoDireccionDto | ModificarTipoDireccionDto): Omit<TipoDireccion, 'tipo_direccion_id'> {
    return {
      descripcion: dto.descripcion,
    };
  }
}