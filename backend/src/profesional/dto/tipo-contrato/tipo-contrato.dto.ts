import { ApiProperty } from '@nestjs/swagger';

export class TipoContratoDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nombre: string;

  @ApiProperty()
  descripcion: string | null;

  @ApiProperty()
  activo: boolean | null;
}
