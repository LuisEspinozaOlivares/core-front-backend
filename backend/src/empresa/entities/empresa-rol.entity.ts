export interface EmpresaRol {
  empresa_rol_id: number;
  empresa_id: number;
  rol_empresa_id: number;
  fecha_asignacion: Date | null;
  activo: boolean | null;
}
