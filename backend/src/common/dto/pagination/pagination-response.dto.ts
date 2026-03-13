import { ApiProperty } from "@nestjs/swagger";

export class PaginationResponseDto<T> {
  @ApiProperty()
  data: T[];

  @ApiProperty()
  page: number;

  @ApiProperty()
  total: number;

  @ApiProperty()
  lastPage: number;
}