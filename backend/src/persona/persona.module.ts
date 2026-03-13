import { Module } from '@nestjs/common';
import {
  EstadoCivilController,
  GeneroController,
  NacionalidadController,
  PersonaController,
  TipoIdentificacionController,
  DireccionPersonaController,
  AmbitoContactoController,
  ContactoController,
} from './controllers';

import {
  EstadoCivilService,
  GeneroService,
  NacionalidadService,
  PersonaService,
  TipoIdentificacionService,
  DireccionPersonaService,
  AmbitoContactoService,
  ContactoService,
} from './services';

export const CONTROLLERS = [
  PersonaController,
  EstadoCivilController,
  GeneroController,
  NacionalidadController,
  TipoIdentificacionController,
  DireccionPersonaController,
  AmbitoContactoController,
  ContactoController,
];

export const SERVICES = [
  PersonaService,
  EstadoCivilService,
  GeneroService,
  NacionalidadService,
  TipoIdentificacionService,
  DireccionPersonaService,
  AmbitoContactoService,
  ContactoService,
];

@Module({
  controllers: [...CONTROLLERS],
  providers: [...SERVICES],
})
export class PersonaModule { }
