import { ApiProperty } from '@nestjs/swagger';

export class PrevisionSaludDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nombre: string;

  @ApiProperty()
  tipo: string;

  @ApiProperty()
  activo: boolean | null;
}
