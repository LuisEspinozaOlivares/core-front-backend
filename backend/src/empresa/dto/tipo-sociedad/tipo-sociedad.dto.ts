import { ApiProperty } from '@nestjs/swagger';

export class TipoSociedadDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  codigo: string;

  @ApiProperty()
  descripcion: string;
}