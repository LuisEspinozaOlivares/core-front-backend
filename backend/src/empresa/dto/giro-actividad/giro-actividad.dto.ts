import { ApiProperty } from '@nestjs/swagger';

export class GiroActividadDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  codigo: string;

  @ApiProperty()
  descripcion: string;
}