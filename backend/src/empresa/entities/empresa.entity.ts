import { ContactoEmpresa } from './contacto-empresa.entity';

export interface Empresa {
  empresa_id: number;
  rut_empresa: string;
  nombre_comercial?: string | null;
  razon_social: string;
  sitio_web?: string | null;
  giro_actividad_id?: number | null;
  tipo_sociedad_id?: number | null;
  sector_economico_id?: number | null;
  created_at: Date;
  updated_at: Date;
  created_by?: string | null;
  updated_by?: string | null;
  activo: boolean | null;
}

export interface EmpresaSimple {
  empresa_id: number;
  rut_empresa: string;
  razon_social: string;
  contacto_empresa: ContactoEmpresa[];
}
