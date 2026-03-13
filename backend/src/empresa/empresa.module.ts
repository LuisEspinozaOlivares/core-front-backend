import { Module } from '@nestjs/common';
import {
  EmpresaService,
  TipoSociedadService,
  GiroActividadService,
  SectorEconomicoService,
  UbicacionEmpresaService,
  EmpresaRolService,
  ContactoEmpresaService,
  RolEmpresaService,
} from './services';


import {
  EmpresaController,
  TipoSociedadController,
  GiroActividadController,
  SectorEconomicoController,
  UbicacionEmpresaController,
  EmpresaRolController,
  ContactoEmpresaController,
  RolEmpresaController,
} from './controllers';


export const CONTROLLERS = [
  EmpresaController,
  TipoSociedadController,
  GiroActividadController,
  SectorEconomicoController,
  UbicacionEmpresaController,
  EmpresaRolController,
  ContactoEmpresaController,
  RolEmpresaController,
];


export const SERVICES = [
  EmpresaService,
  TipoSociedadService,
  GiroActividadService,
  SectorEconomicoService,
  UbicacionEmpresaService,
  EmpresaRolService,
  ContactoEmpresaService,
  RolEmpresaService,
];


@Module({
  controllers: [...CONTROLLERS],
  providers: [...SERVICES],
})
export class EmpresaModule { }
