/**
 * Entidad que refleja la respuesta del backend (camelCase, coincide con EmpresaDto de NestJS)
 */
export interface EmpresaEntity {
  id: number;
  rutEmpresa: string;
  nombreComercial?: string | null;
  razonSocial: string;
  sitioWeb?: string | null;
  giroActividadId?: number | null;
  tipoSociedadId?: number | null;
  sectorEconomicoId?: number | null;
  active: boolean;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface RolEmpresaEntity {
  rol_empresa_id: number;
  codigo: string;
  descripcion: string;
}

export interface EmpresaRolEntity {
  empresa_rol_id: number;
  empresa_id: number;
  rol_empresa_id: number;
  fecha_asignacion: string;
}

export interface ContactoEmpresaEntity {
  contacto_empresa_id: number;
  empresa_id: number;
  tipo_contacto_id: number;
  valor_contacto: string;
  descripcion?: string;
  es_principal: boolean;
  fecha_creacion?: string;
}

export interface UbicacionEmpresaEntity {
  ubicacion_empresa_id: number;
  empresa_id: number;
  calle: string;
  numero: string;
  bloque?: string;
  apartamento?: string;
  localidad_id: number;
  fecha_creacion?: string;
}
