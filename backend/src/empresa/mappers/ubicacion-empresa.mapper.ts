import { UbicacionEmpresa } from '../entities/ubicacion-empresa.entity';
import { UbicacionEmpresaDto, CrearUbicacionEmpresaDto, ModificarUbicacionEmpresaDto } from '../dto/ubicacion-empresa';

export class UbicacionEmpresaMapper {
  static toDto(entity: UbicacionEmpresa): UbicacionEmpresaDto {
    return {
      ubicacionEmpresaId: entity.ubicacion_empresa_id,
      empresaId: entity.empresa_id,
      tipoDireccionId: entity.tipo_direccion_id,
      calle: entity.calle,
      numero: entity.numero ?? undefined,
      bloque: entity.bloque ?? undefined,
      apartamento: entity.apartamento ?? undefined,
      localidadId: entity.localidad_id,
      activo: entity.activo ?? undefined,
    };
  }

  static toEntity(dto: CrearUbicacionEmpresaDto | ModificarUbicacionEmpresaDto): Partial<UbicacionEmpresa> {
    return {
      empresa_id: dto.empresaId,
      tipo_direccion_id: dto.tipoDireccionId,
      calle: dto.calle,
      numero: dto.numero,
      bloque: dto.bloque,
      apartamento: dto.apartamento,
      localidad_id: dto.localidadId,
      activo: dto.activo,
    };
  }
}
