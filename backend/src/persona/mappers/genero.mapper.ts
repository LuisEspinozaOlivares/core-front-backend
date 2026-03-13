import { CrearGeneroDto, GeneroDto, ModificarGeneroDto } from '../dto';
import { Genero } from '../entities';

export class GeneroMapper {
  static toDto(genero: Genero): GeneroDto {
    return {
      id: genero.genero_id,
      codigo: genero.codigo,
      descripcion: genero.descripcion,
    };
  }

  static toEntity(generoDto: CrearGeneroDto | ModificarGeneroDto): Omit<Genero, 'genero_id'> {
    return {
      codigo: generoDto.codigo,
      descripcion: generoDto.descripcion || null,
    };
  }
}