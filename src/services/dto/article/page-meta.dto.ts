import { ApiProperty } from '@nestjs/swagger';
import { PageMetaArticleDtoParameters } from '../interfaces';

export class PageMetaDtoArticles {
  @ApiProperty({ example: 1 })
  readonly page: number;

  @ApiProperty({ example: 1 })
  readonly take: number;

  @ApiProperty({ example: '' })
  readonly search: string;

  @ApiProperty({ example: '' })
  readonly category: string;

  @ApiProperty({ example: 10 })
  readonly itemCount: number;

  @ApiProperty({ example: 2 })
  readonly pageCount: number;

  @ApiProperty({ example: false })
  readonly hasPreviousPage: boolean;

  @ApiProperty({ example: true })
  readonly hasNextPage: boolean;

  constructor({ pageOptionsDto, itemCount }: PageMetaArticleDtoParameters) {
    this.page = pageOptionsDto.page;
    this.take = pageOptionsDto.take;
    this.search = pageOptionsDto.search;
    this.category = pageOptionsDto.category;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
