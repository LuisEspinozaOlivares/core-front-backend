import { EmpresaRol } from '../entities';
import { CrearEmpresaRolDto, EmpresaRolDto } from '../dto';

export class EmpresaRolMapper {
  static toDto(entity: EmpresaRol): EmpresaRolDto {
    const dto = new EmpresaRolDto();
    dto.empresaRolId = entity.empresa_rol_id;
    dto.empresaId = entity.empresa_id;
    dto.rolEmpresaId = entity.rol_empresa_id;
    dto.fechaAsignacion = entity.fecha_asignacion;
    dto.activo = entity.activo;
    return dto;
  }

  static toEntity(dto: Partial<CrearEmpresaRolDto>): Partial<EmpresaRol> {
    return {
      empresa_id: dto.empresaId,
      rol_empresa_id: dto.rolEmpresaId,
      activo: dto.activo ?? true,
    };
  }
}
