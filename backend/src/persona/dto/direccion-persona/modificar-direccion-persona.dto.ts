import { PartialType } from '@nestjs/swagger';
import { CrearDireccionPersonaDto } from './crear-direccion-persona.dto';

export class ModificarDireccionPersonaDto extends PartialType(CrearDireccionPersonaDto) { }
