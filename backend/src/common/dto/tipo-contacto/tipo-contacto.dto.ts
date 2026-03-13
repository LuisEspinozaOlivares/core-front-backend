import { ApiProperty } from '@nestjs/swagger';

export class TipoContactoDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  descripcion: string;
}