import { Injectable } from '@nestjs/common';
import * as Parser from 'rss-parser';
import { Like, Repository } from 'typeorm';
import { ArticleEntity } from '@entities/Article.entity';
import { PageDto } from '@services/dto/page/page.dto';
import { ArticleResponseDto } from '@services/dto/article/response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from '@services/category.service';
import { PageMetaDtoArticles } from '@services/dto/article/page-meta.dto';
import { PageOptionsArticlesDto } from '@services/dto/article/page-options.dto';

@Injectable()
export class ArticleService {
  private readonly _parser;

  constructor(
    @InjectRepository(ArticleEntity)
    private readonly _articleRepository: Repository<ArticleEntity>,
    private readonly _categoryService: CategoryService,
  ) {
    this._parser = new Parser();
  }

  async getByLink(link: string): Promise<ArticleEntity | null> {
    return await this._articleRepository.findOneBy({ sourceLink: link });
  }

  async getArticles(pageOptionsDto: PageOptionsArticlesDto): Promise<PageDto<ArticleResponseDto, PageMetaDtoArticles>> {
    const _whereCategory = pageOptionsDto.category ? { categories: { name: pageOptionsDto.category } } : {};
    const [result, itemCount] = await this._articleRepository.findAndCount({
      relations: ['categories'],
      order: { date: { direction: pageOptionsDto.order } },
      where: [
        { title: Like(`%${pageOptionsDto.search}%`), ..._whereCategory },
        { content: Like(`%${pageOptionsDto.search}%`), ..._whereCategory },
      ],
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
    });

    const transformedData = result.map((r) => {
      return { ...r, categories: [...r.categories.map((c) => c.name)] };
    });

    const pageMetaDto = new PageMetaDtoArticles({ itemCount, pageOptionsDto });

    return new PageDto(transformedData, pageMetaDto);
  }

  async create(title: string, sourceLink: string, date: number, content: string, image: string, categories: string[]): Promise<ArticleEntity> {
    const newArticle = await this._articleRepository.create({
      title,
      date,
      content,
      image,
      sourceLink,
    });
    const createdArticle = await this._articleRepository.save(newArticle);

    createdArticle.categories = await this._categoryService.getCategories(categories);
    return await this._articleRepository.save(createdArticle);
  }

  // @Cron("30 * * * * *")
  async parse(): Promise<any> {
    const items = (await this._parser.parseURL('https://www.rbc.ua/static/rss/ukrnet.strong.ukr.rss.xml'))?.items;
    if (items) {
      for (const item of items) {
        const { title, categories, link, enclosure, isoDate } = item;
        const article = await this.getByLink(link);
        if (!article) {
          await this.create(title, link, new Date(isoDate).getTime(), item['content:encodedSnippet'], enclosure?.url, categories);
        }
      }
    }
  }
}
