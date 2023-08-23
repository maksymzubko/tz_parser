import { ApiProperty } from '@nestjs/swagger';
export class ArticleResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Title' })
  title: string;

  @ApiProperty({ example: 1 })
  sourceLink: string;

  @ApiProperty({ example: 1686841959 })
  date: number;

  @ApiProperty({ example: 'Content' })
  content: string;

  @ApiProperty({
    example: 'https://www.rbc.ua/static/img/d/s/dscf0141_enhanced_nr_id92187_1300x867_6_1300x820.jpg',
  })
  image: string;

  @ApiProperty({
    example: ['category1', 'category2'],
  })
  categories: string[];
}
