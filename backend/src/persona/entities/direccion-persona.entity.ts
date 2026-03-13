export interface DireccionPersona {
    direccion_persona_id: number;
    persona_id: number;
    tipo_direccion_id: number;
    calle: string | null;
    numero: string | null;
    bloque: string | null;
    apartamento: string | null;
    localidad_id: number | null;
    activo: boolean | null;
    updated_at: Date | null;
}
