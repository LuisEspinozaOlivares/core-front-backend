import { ApiProperty } from '@nestjs/swagger';
import { ContactoEmpresaSimpleDto } from '../contacto-empresa';

export class EmpresaDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  rutEmpresa: string;

  @ApiProperty({ required: false })
  nombreComercial?: string | null;

  @ApiProperty()
  razonSocial: string;

  @ApiProperty({ required: false })
  sitioWeb?: string | null;

  @ApiProperty({ required: false })
  giroActividadId?: number | null;

  @ApiProperty({ required: false })
  tipoSociedadId?: number | null;

  @ApiProperty({ required: false })
  sectorEconomicoId?: number | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false })
  createdBy?: string | null;

  @ApiProperty({ required: false })
  updatedBy?: string | null;

  @ApiProperty()
  active: boolean;
}

export class EmpresaSimpleDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  rutEmpresa: string;

  @ApiProperty()
  razonSocial: string;

  @ApiProperty()
  contactos?: ContactoEmpresaSimpleDto[];
}