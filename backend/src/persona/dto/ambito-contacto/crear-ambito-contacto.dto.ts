import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CrearAmbitoContactoDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    descripcion: string;
}
