export interface ContactoEmpresa {
  contacto_empresa_id: number;
  empresa_id: number;
  tipo_contacto_id: number;
  valor_contacto: string;
  descripcion?: string | null;
  es_principal: boolean | null;
  created_at: Date | null;
  updated_at: Date | null;
}
