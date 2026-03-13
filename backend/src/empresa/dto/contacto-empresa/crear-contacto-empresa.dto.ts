import { IsString, IsNotEmpty, IsOptional, IsInt, MaxLength, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CrearContactoEmpresaDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  empresaId: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  tipoContactoId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  valorContacto: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  descripcion?: string;

  @ApiProperty({ required: false, default: false })
  @IsBoolean()
  @IsOptional()
  esPrincipal?: boolean;
}
