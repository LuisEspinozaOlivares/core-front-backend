import { Module } from '@nestjs/common';
import {
  AreaAdministrativaController,
  LocalidadController,
  PaisController,
  TipoContactoController,
  TipoDireccionController,
} from './controllers';
import {
  AreaAdministrativaService,
  LocalidadService,
  PaisService,
  TipoContactoService,
  TipoDireccionService,
} from './services';

export const CONTROLLERS = [
  PaisController,
  AreaAdministrativaController,
  LocalidadController,
  TipoContactoController,
  TipoDireccionController,
]

export const SERVICES = [
  PaisService,
  AreaAdministrativaService,
  LocalidadService,
  TipoContactoService,
  TipoDireccionService,
]

@Module({
  controllers: [...CONTROLLERS],
  providers: [...SERVICES],
})
export class CommonModule { }
