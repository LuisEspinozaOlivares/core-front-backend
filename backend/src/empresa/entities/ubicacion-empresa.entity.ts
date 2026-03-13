export interface UbicacionEmpresa {
  ubicacion_empresa_id: number;
  empresa_id: number;
  tipo_direccion_id: number;
  calle: string;
  numero: string | null;
  bloque: string | null;
  apartamento: string | null;
  localidad_id: number;
  activo: boolean | null;
}
