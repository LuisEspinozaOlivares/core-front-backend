import { RolEmpresaDto, CrearRolEmpresaDto, ModificarRolEmpresaDto } from '../dto';
import { RolEmpresa } from '../entities';

export class RolEmpresaMapper {
  static toDto(entity: RolEmpresa): RolEmpresaDto {
    return {
      id: entity.rol_empresa_id,
      codigo: entity.codigo,
      descripcion: entity.descripcion,
    };
  }

  static toEntity(dto: CrearRolEmpresaDto | ModificarRolEmpresaDto): Omit<RolEmpresa, 'rol_empresa_id'> {
    return {
      codigo: dto.codigo!,
      descripcion: dto.descripcion!,
    };
  }
}
