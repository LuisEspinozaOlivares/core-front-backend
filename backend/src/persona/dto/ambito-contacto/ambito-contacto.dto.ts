import { ApiProperty } from '@nestjs/swagger';

export class AmbitoContactoDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    descripcion: string;
}
