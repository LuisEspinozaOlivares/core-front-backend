import { ApiProperty } from '@nestjs/swagger';

export class EstadoProfesionalDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  codigo: string;

  @ApiProperty()
  descripcion: string;
}
