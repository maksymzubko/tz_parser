import { Injectable } from '@nestjs/common';
import * as Parser from 'rss-parser';
import { Repository } from 'typeorm';
import { ArticleEntity } from '@entities/Article.entity';
import { PageDto } from '@services/dto/page/page.dto';
import { ArticleResponseDto } from '@services/dto/article/response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from '@services/category.service';
import { PageMetaDtoArticles } from '@services/dto/article/page-meta.dto';
import { PageOptionsArticlesDto } from '@services/dto/article/page-options.dto';
import { ExceptionNotFound } from '@exceptions/http.exceptions';
import { ArticleRequestDto } from '@services/dto/article/request.dto';
import { Cron } from "@nestjs/schedule";

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

  async getById(id: number): Promise<ArticleEntity | null> {
    return await this._articleRepository.findOne({ where: { id }, relations: ['categories']});
  }

  async getByLink(link: string): Promise<ArticleEntity | null> {
    return await this._articleRepository.findOneBy({ sourceLink: link });
  }

  async getArticle(id: number): Promise<ArticleResponseDto> {
    const article = await this._articleRepository.createQueryBuilder('a').leftJoinAndSelect('a.categories', 'c').where(`a.id = :id`, { id }).getOne();

    if (!article) throw new ExceptionNotFound('Article with provided ID not found!');

    return { ...article, categories: [...article.categories.map((c) => c.name)] };
  }

  async getArticles(pageOptionsDto: PageOptionsArticlesDto): Promise<PageDto<ArticleResponseDto, PageMetaDtoArticles>> {
    let where = ``;
    if(pageOptionsDto.search && pageOptionsDto.search.length)
      where += `(a.title like :search OR a.content like :search)`
    if(pageOptionsDto.category && pageOptionsDto.category.length)
      where += `${pageOptionsDto.search ? 'AND c.name = :name' : 'c.name = :name'}`

    console.log(where);
    const [result, itemCount] = await this._articleRepository
      .createQueryBuilder('a')
      .leftJoinAndSelect('a.categories', 'c')
      .orderBy('a.date', pageOptionsDto.order)
      .take(pageOptionsDto.take)
      .skip(pageOptionsDto.skip)
      .where(where, {
        search: `%${pageOptionsDto.search}%`,
        name: pageOptionsDto.category,
      })
      .getManyAndCount();

    const transformedData = result.map((r) => {
      return { ...r, categories: [...r.categories.map((c) => c.name)] };
    });

    const pageMetaDto = new PageMetaDtoArticles({ itemCount, pageOptionsDto });

    return new PageDto(transformedData, pageMetaDto);
  }

  async create(body: ArticleRequestDto): Promise<ArticleResponseDto> {
    const newArticle = await this._articleRepository.create({
      ...body,
      categories: [],
    });
    const createdArticle = await this._articleRepository.save(newArticle);

    const _uniqArrayCategories = Array.from(new Set(body.categories));
    createdArticle.categories = await this._categoryService.getCategories(_uniqArrayCategories);
    const result = await this._articleRepository.save(createdArticle);
    return { ...result, categories: [...result.categories.map((c) => c.name)] };
  }

  async update(id: number, body: ArticleRequestDto): Promise<ArticleResponseDto> {
    let article = await this.getById(id);
    if (!article) throw new ExceptionNotFound('Article with provided ID not found!');

    const _uniqArrayCategories = Array.from(new Set(body.categories));
    const categories = await this._categoryService.getCategories(_uniqArrayCategories);

    await this._articleRepository
      .createQueryBuilder('a')
      .relation(ArticleEntity, 'categories')
      .of(article)
      .addAndRemove(categories, article.categories);

    article = { ...article, ...body, categories };

    const result = await this._articleRepository.save(article);
    return { ...result, categories: [...result.categories.map((c) => c.name)] };
  }

  async delete(id: number): Promise<boolean> {
    const article = await this.getById(id);
    if (!article) throw new ExceptionNotFound('Article with provided ID not found!');

    await this._articleRepository.remove(article);
    return true;
  }

  @Cron("30 * * * * *")
  async parse(): Promise<any> {
    const items = (await this._parser.parseURL('https://www.rbc.ua/static/rss/ukrnet.strong.ukr.rss.xml'))?.items;
    console.log(items.length);
    if (items) {
      for (const item of items) {
        const { title, categories, link, enclosure, isoDate } = item;
        const article = await this.getByLink(link);
        if (!article) {
          const obj = {
            title,
            categories,
            date: new Date(isoDate).getTime(),
            content: item['content:encoded'],
            image: enclosure?.url,
            sourceLink: link,
          } as ArticleRequestDto;
          await this.create(obj);
        }
      }
    }
  }
}
