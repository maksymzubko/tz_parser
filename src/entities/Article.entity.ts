import { Entity, Column, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CategoryEntity } from './Category.entity';

@Entity({ name: 'articles' })
export class ArticleEntity extends BaseEntity {
  @ApiProperty({ example: 'Title' })
  @Column({ nullable: false })
  title: string;

  @ApiProperty({ example: 1 })
  @Column({ name: 'source_link', nullable: false })
  sourceLink: number;

  @ApiProperty({ example: 1686841959 })
  @Column({ type: 'bigint', nullable: false })
  date: number;

  @ApiProperty({ example: 'Content' })
  @Column({ nullable: false })
  content: string;

  @ApiProperty({
    example:
      'https://www.rbc.ua/static/img/d/s/dscf0141_enhanced_nr_id92187_1300x867_6_1300x820.jpg',
  })
  @Column()
  image: string;

  @ManyToMany(() => CategoryEntity, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinTable()
  categories: CategoryEntity[];
}
