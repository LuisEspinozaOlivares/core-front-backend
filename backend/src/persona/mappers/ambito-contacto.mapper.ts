import { CrearAmbitoContactoDto, ModificarAmbitoContactoDto, AmbitoContactoDto } from '../dto';
import { AmbitoContacto } from '../entities';

export class AmbitoContactoMapper {
    static toDto(ambitoContacto: AmbitoContacto): AmbitoContactoDto {
        return {
            id: ambitoContacto.ambito_contacto_id,
            descripcion: ambitoContacto.descripcion,
        };
    }

    static toEntity(ambitoContactoDto: CrearAmbitoContactoDto | ModificarAmbitoContactoDto): Omit<AmbitoContacto, 'ambito_contacto_id'> {
        return {
            descripcion: ambitoContactoDto.descripcion,
        };
    }
}
