import { PartialType } from '@nestjs/swagger';
import { CrearEmpresaRolDto } from './crear-empresa-rol.dto';

export class ModificarEmpresaRolDto extends PartialType(CrearEmpresaRolDto) { }
