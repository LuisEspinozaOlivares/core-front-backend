export interface ProfesionalCv {
  profesional_cv_id: number;
  profesional_id: number;
  tipo_cv_id: number;
  url_documento: string;
  nombre_archivo: string | null;
  fecha_carga: Date | null;
  activo: boolean | null;
}
