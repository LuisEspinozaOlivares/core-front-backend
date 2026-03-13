import { ApiProperty } from '@nestjs/swagger';

export class TipoCvDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  codigo: string;

  @ApiProperty()
  descripcion: string;
}
