import { ApiProperty } from '@nestjs/swagger';

export class CajaCompensacionDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nombre: string;

  @ApiProperty()
  activo: boolean | null;
}
