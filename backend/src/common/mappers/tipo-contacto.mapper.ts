import { TipoContacto } from '../entities';
import { CrearTipoContactoDto, ModificarTipoContactoDto, TipoContactoDto } from '../dto';

export class TipoContactoMapper {
  static toDto(tipoContacto: TipoContacto): TipoContactoDto {
    return {
      id: tipoContacto.tipo_contacto_id,
      descripcion: tipoContacto.descripcion,
    };
  }

  static toEntity(dto: CrearTipoContactoDto | ModificarTipoContactoDto): Omit<TipoContacto, 'tipo_contacto_id'> {
    return {
      descripcion: dto.descripcion,
    };
  }
}