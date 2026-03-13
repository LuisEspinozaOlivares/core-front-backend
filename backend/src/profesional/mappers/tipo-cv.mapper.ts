import { TipoCvDto, CrearTipoCvDto, ModificarTipoCvDto } from '../dto';
import { TipoCv } from '../entities';

export class TipoCvMapper {
  static toDto(tipoCv: TipoCv): TipoCvDto {
    return {
      id: tipoCv.tipo_cv_id,
      codigo: tipoCv.codigo,
      descripcion: tipoCv.descripcion,
    };
  }

  static toEntity(dto: CrearTipoCvDto | ModificarTipoCvDto): Omit<TipoCv, 'tipo_cv_id'> {
    return {
      codigo: dto.codigo,
      descripcion: dto.descripcion,
    };
  }
}
