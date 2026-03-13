import { ApiProperty } from '@nestjs/swagger';

export class RolEmpresaDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  codigo: string;

  @ApiProperty()
  descripcion: string;
}
