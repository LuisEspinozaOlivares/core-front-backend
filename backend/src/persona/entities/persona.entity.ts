export class Persona {
  persona_id: number;
  tipo_identificacion_id: number;
  numero_identificacion: string;
  nombres_persona: string;
  primer_apellido: string;
  segundo_apellido?: string | null;
  fecha_nacimiento?: Date | null;
  nacionalidad_id?: number | null;
  genero_id?: number | null;
  estado_civil_id?: number | null;
  pais_origen_id?: number | null;
  pais_residencia_id?: number | null;
  created_at: Date;
  updated_at: Date;
  created_by?: string | null;
  updated_by?: string | null;
  activo: boolean | null;
}
