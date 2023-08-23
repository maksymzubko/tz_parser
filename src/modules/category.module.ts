import { Module } from '@nestjs/common';
import { CategoryService } from '@services/category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '@entities/Category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
