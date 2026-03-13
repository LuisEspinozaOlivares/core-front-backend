import { IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CrearProfesionalCvDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  profesionalId: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  tipoCvId: number;

  @ApiProperty()
  @IsUrl()
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  urlDocumento: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  nombreArchivo?: string;
}
