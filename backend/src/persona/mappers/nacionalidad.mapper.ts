import { Nacionalidad } from '../entities';
import { CrearNacionalidadDto, ModificarNacionalidadDto, NacionalidadDto } from '../dto';

export class NacionalidadMapper {
  static toDto(nacionalidad: Nacionalidad): NacionalidadDto {
    return {
      id: nacionalidad.nacionalidad_id,
      nombre: nacionalidad.nombre,
      gentilicio: nacionalidad.gentilicio,
    };
  }

  static toEntity(nacionalidadDto: CrearNacionalidadDto | ModificarNacionalidadDto): Omit<Nacionalidad, 'nacionalidad_id'> {
    return {
      nombre: nacionalidadDto.nombre,
      gentilicio: nacionalidadDto.gentilicio,
    };
  }
}