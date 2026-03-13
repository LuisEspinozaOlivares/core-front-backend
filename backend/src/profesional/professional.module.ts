import { Module } from '@nestjs/common';
import {
  ProfesionalController,
  AfpController,
  CajaCompensacionController,
  CargoProfesionalController,
  EstadoProfesionalController,
  ProfesionalCvController,
  ProfesionalAreaController,
  TipoContratoController,
  TipoCvController,
  PrevisionSaludController,
} from './controllers';
import {
  ProfesionalService,
  AfpService,
  CajaCompensacionService,
  CargoProfesionalService,
  EstadoProfesionalService,
  ProfesionalCvService,
  ProfesionalAreaService,
  TipoContratoService,
  TipoCvService,
  PrevisionSaludService,
} from './services';

export const CONTROLLERS = [
  ProfesionalController,
  AfpController,
  CajaCompensacionController,
  CargoProfesionalController,
  EstadoProfesionalController,
  ProfesionalCvController,
  ProfesionalAreaController,
  TipoContratoController,
  TipoCvController,
  PrevisionSaludController,
];

export const SERVICES = [
  ProfesionalService,
  AfpService,
  CajaCompensacionService,
  CargoProfesionalService,
  EstadoProfesionalService,
  ProfesionalCvService,
  ProfesionalAreaService,
  TipoContratoService,
  TipoCvService,
  PrevisionSaludService,
];

@Module({
  controllers: [...CONTROLLERS],
  providers: [...SERVICES],
})
export class ProfessionalModule { }
