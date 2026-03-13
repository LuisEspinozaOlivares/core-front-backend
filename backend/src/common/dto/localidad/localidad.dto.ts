import { ApiProperty } from '@nestjs/swagger';

export class LocalidadDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nombre: string;

  @ApiProperty()
  codigoPostal: string | null;

  @ApiProperty()
  areaAdministrativaId: number;
}