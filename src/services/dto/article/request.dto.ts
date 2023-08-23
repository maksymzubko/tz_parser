import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class ArticleRequestDto {
  @ApiProperty({ example: 'Title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 1 })
  @IsString()
  sourceLink: string;

  @ApiProperty({ example: 1686841959 })
  @IsNumber()
  date: number;

  @ApiProperty({ example: 'Content' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    example: 'https://www.rbc.ua/static/img/d/s/dscf0141_enhanced_nr_id92187_1300x867_6_1300x820.jpg',
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    example: ['category1', 'category2'],
  })
  @IsArray({})
  categories: string[];
}
