import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'categories' })
export class CategoryEntity extends BaseEntity {
  @ApiProperty({ example: 'Name' })
  @Column({ nullable: false, unique: true })
  name: string;
}
