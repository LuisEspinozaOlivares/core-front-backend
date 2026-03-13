export class Profesional {
  profesional_id: number;
  persona_id: number;
  empresa_id: number;
  fecha_ingreso?: Date | null;
  fecha_termino?: Date | null;
  estado_profesional_id: number;
  tipo_contrato_id?: number | null;
  profesional_cargo_id: number;
  profesional_area_id: number;
  profesional_jefatura_id?: number | null;
  prevision_salud_id?: number | null;
  afp_id?: number | null;
  caja_compensacion_id?: number | null;
  activo: boolean | null;
  talana_id?: number | null;
  created_at?: Date | null;
  updated_at?: Date | null;
}
