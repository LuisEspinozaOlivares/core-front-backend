import { ApiProperty } from '@nestjs/swagger';

export class TipoIdentificacionDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  codigo: string;

  @ApiProperty()
  descripcion: string;
}