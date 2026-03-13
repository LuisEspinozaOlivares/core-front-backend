import { CajaCompensacionDto, CrearCajaCompensacionDto, ModificarCajaCompensacionDto } from '../dto';
import { CajaCompensacion } from '../entities';

export class CajaCompensacionMapper {
  static toDto(caja: CajaCompensacion): CajaCompensacionDto {
    return {
      id: caja.caja_compensacion_id,
      nombre: caja.nombre,
      activo: caja.activo,
    };
  }

  static toEntity(dto: CrearCajaCompensacionDto | ModificarCajaCompensacionDto): Omit<CajaCompensacion, 'caja_compensacion_id'> {
    return {
      nombre: dto.nombre!,
      activo: dto.activo ?? true,
    };
  }
}
