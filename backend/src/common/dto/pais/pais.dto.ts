import { ApiProperty } from '@nestjs/swagger';

export class PaisDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nombre: string;

  @ApiProperty()
  codigoIso: string;
}