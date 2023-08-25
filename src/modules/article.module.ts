import { Module } from '@nestjs/common';
import { ArticleService } from '@services/article.service';
import { ArticleController } from '@controllers/article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from '@entities/Article.entity';
import { CategoryModule } from '@modules/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity]), CategoryModule],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
