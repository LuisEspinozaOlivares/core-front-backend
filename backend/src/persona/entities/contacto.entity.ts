export interface Contacto {
  contacto_persona_id: number;
  persona_id: number;
  tipo_contacto_id: number;
  ambito_contacto_id: number;
  valor: string;
  principal: boolean | null;
  activo: boolean | null;
}
