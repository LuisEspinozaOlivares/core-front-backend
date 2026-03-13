import { ApiProperty } from '@nestjs/swagger';

export class TipoDireccionDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  descripcion: string;
}