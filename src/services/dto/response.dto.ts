import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto {
  @ApiProperty({ example: '2023-02-10T13:37:55.096Z' })
  timestamp: string;

  @ApiProperty({ example: ['Reason'] })
  errors: string[];
}
