/**
 * Entidad que refleja la respuesta del backend (camelCase, coincide con ProfesionalDto de NestJS)
 */
export interface ProfesionalEntity {
  id: number;
  personaId: number;
  empresaId: number;
  fechaIngreso?: string | null;
  fechaTermino?: string | null;
  estadoProfesionalId: number;
  tipoContratoId?: number | null;
  profesionalCargoId: number;
  profesionalAreaId: number;
  profesionalJefaturaId?: number | null;
  previsionSaludId?: number | null;
  afpId?: number | null;
  cajaCompensacionId?: number | null;
  activo: boolean;
  talanaId?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

/**
 * Entidades auxiliares (sin cambios, usadas para relaciones opcionales en tabla)
 */
export interface EstadoProfesionalEntity {
  rrhh_estado_profesional_id: number;
  codigo: string;
  descripcion: string;
}

export interface TipoContratoEntity {
  rrhh_tipo_contrato_id: number;
  nombre: string;
  descripcion: string;
  activo: boolean;
}

export interface ProfesionalCargoEntity {
  profesional_cargo_id: number;
  nombre_cargo: string;
  descripcion: string;
  activo: boolean;
}

export interface PrevisionSaludEntity {
  rrhh_prevision_salud_id: number;
  nombre: string;
  tipo: string;
  activo: boolean;
}

export interface AfpEntity {
  rrhh_afp_id: number;
  nombre: string;
  activo: boolean;
}

export interface CajaCompensacionEntity {
  rrhh_caja_compensacion_id: number;
  nombre: string;
  activo: boolean;
}

export interface ProfesionalCvEntity {
  profesional_link_cv_id: number;
  link_cv: string;
}
