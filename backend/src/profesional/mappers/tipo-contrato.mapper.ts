import { TipoContratoDto, CrearTipoContratoDto, ModificarTipoContratoDto } from '../dto';
import { TipoContrato } from '../entities';

export class TipoContratoMapper {
  static toDto(tipoContrato: TipoContrato): TipoContratoDto {
    return {
      id: tipoContrato.tipo_contrato_id,
      nombre: tipoContrato.nombre,
      descripcion: tipoContrato.descripcion,
      activo: tipoContrato.activo,
    };
  }

  static toEntity(dto: CrearTipoContratoDto | ModificarTipoContratoDto): Omit<TipoContrato, 'tipo_contrato_id'> {
    return {
      nombre: dto.nombre || '',
      descripcion: dto.descripcion ?? null,
      activo: dto.activo ?? true,
    };
  }
}
