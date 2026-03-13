import { ApiProperty } from '@nestjs/swagger';

export class CargoProfesionalDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nombreCargo: string;

  @ApiProperty()
  descripcion?: string;

  @ApiProperty()
  activo: boolean;
}
