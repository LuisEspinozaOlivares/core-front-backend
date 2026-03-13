import { CrearEmpresaDto, EmpresaDto, EmpresaSimpleDto, ModificarEmpresaDto } from '../dto';
import { ContactoEmpresa, Empresa, EmpresaSimple } from '../entities';
import { ContactoEmpresaMapper } from './contacto-empresa.mapper';

export class EmpresaMapper {
  static toEntity(dto: CrearEmpresaDto | ModificarEmpresaDto): Omit<Empresa, 'empresa_id' | 'created_at' | 'updated_at' | 'activo'> {
    return {
      rut_empresa: dto.rutEmpresa,
      nombre_comercial: dto.nombreComercial || null,
      razon_social: dto.razonSocial,
      sitio_web: dto.sitioWeb || null,
      giro_actividad_id: dto.giroActividadId || null,
      tipo_sociedad_id: dto.tipoSociedadId || null,
      sector_economico_id: dto.sectorEconomicoId || null,
      created_by: null,
      updated_by: null,
    };
  }

  static toDto(empresa: Empresa): EmpresaDto {
    return {
      id: empresa.empresa_id,
      rutEmpresa: empresa.rut_empresa,
      nombreComercial: empresa.nombre_comercial,
      razonSocial: empresa.razon_social,
      sitioWeb: empresa.sitio_web,
      giroActividadId: empresa.giro_actividad_id,
      tipoSociedadId: empresa.tipo_sociedad_id,
      sectorEconomicoId: empresa.sector_economico_id,
      createdAt: empresa.created_at,
      updatedAt: empresa.updated_at,
      createdBy: empresa.created_by,
      updatedBy: empresa.updated_by,
      active: empresa.activo ?? true,
    };
  }

  static toSimpleDto(empresa: EmpresaSimple): EmpresaSimpleDto {
    return {
      id: empresa.empresa_id,
      rutEmpresa: empresa.rut_empresa,
      razonSocial: empresa.razon_social,
      contactos: empresa.contacto_empresa?.map((contacto: ContactoEmpresa) => ContactoEmpresaMapper.toSimpleDto(contacto)),
    };
  }
}
