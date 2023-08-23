import { Controller, Get, Query } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from '@services/dto/response.dto';
import { ArticleService } from '@services/article.service';
import { PageDto } from '@services/dto/page/page.dto';
import { ArticleResponseDto } from '@services/dto/article/response.dto';
import { PageMetaDtoArticles } from '@services/dto/article/page-meta.dto';
import { PageOptionsArticlesDto } from '@services/dto/article/page-options.dto';

@Controller('article')
@ApiTags('article')
export class ArticleController {
  constructor(private readonly _articleService: ArticleService) {}

  @Get()
  @ApiOperation({
    summary: 'Get articles list',
    description: 'Return article list, can be provided query: [sort_by, page_size, page, ]',
  })
  @ApiOkResponse({ type: PageDto<ArticleResponseDto, PageMetaDtoArticles> })
  @ApiInternalServerErrorResponse({ type: ResponseDto })
  async getArticles(@Query() pageOptionsDto: PageOptionsArticlesDto): Promise<PageDto<ArticleResponseDto, PageMetaDtoArticles>> {
    return await this._articleService.getArticles(pageOptionsDto);
  }
}
