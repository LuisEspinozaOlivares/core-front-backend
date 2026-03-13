import { ApiProperty } from '@nestjs/swagger';

export class UbicacionEmpresaDto {
  @ApiProperty()
  ubicacionEmpresaId: number;

  @ApiProperty()
  empresaId: number;

  @ApiProperty()
  tipoDireccionId: number;

  @ApiProperty()
  calle: string;

  @ApiProperty()
  numero?: string;

  @ApiProperty()
  bloque?: string;

  @ApiProperty()
  apartamento?: string;

  @ApiProperty()
  localidadId: number;

  @ApiProperty()
  activo?: boolean;
}
