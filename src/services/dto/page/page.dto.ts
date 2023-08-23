import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class PageDto<T, A> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @ApiProperty({ type: 'object' })
  readonly meta: A;

  constructor(data: T[], meta: A) {
    this.data = data;
    this.meta = meta;
  }
}
