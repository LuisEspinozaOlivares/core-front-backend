import { ApiProperty } from '@nestjs/swagger';

export class ContactoEmpresaDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  empresaId: number;

  @ApiProperty()
  tipoContactoId: number;

  @ApiProperty()
  valorContacto: string;

  @ApiProperty({ required: false })
  descripcion?: string | null;

  @ApiProperty()
  esPrincipal: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class ContactoEmpresaSimpleDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  empresaId: number;

  @ApiProperty()
  tipoContactoId: number;

  @ApiProperty()
  valorContacto: string;
}