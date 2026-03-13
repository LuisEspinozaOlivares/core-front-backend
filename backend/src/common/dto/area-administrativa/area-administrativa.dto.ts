import { ApiProperty } from '@nestjs/swagger';

export class AreaAdministrativaDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nombre: string;

  @ApiProperty()
  codigoPostal: string | null;

  @ApiProperty()
  tipo: string | null;

  @ApiProperty()
  paisId: number;
}