import { ApiProperty } from '@nestjs/swagger';

export class ContactoDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  personaId: number;

  @ApiProperty()
  tipoContactoId: number;

  @ApiProperty()
  ambitoContactoId: number;

  @ApiProperty()
  valor: string;

  @ApiProperty()
  principal: boolean | null;

  @ApiProperty()
  activo: boolean | null;
}
