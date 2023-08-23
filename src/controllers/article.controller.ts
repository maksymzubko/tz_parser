import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseDto } from '@services/dto/response.dto';
import { ArticleService } from '@services/article.service';
import { PageDto } from '@services/dto/page/page.dto';
import { ArticleResponseDto } from '@services/dto/article/response.dto';
import { PageMetaDtoArticles } from '@services/dto/article/page-meta.dto';
import { PageOptionsArticlesDto } from '@services/dto/article/page-options.dto';
import { SkipAuth } from '@decorators/skip-auth.decorator';
import { ArticleRequestDto } from '@services/dto/article/request.dto';
import { AuthGuard } from '@guards/auth.guard';

@Controller('article')
@ApiTags('article')
@UseGuards(AuthGuard)
export class ArticleController {
  constructor(private readonly _articleService: ArticleService) {}

  @SkipAuth()
  @Get()
  @ApiOperation({
    summary: 'Get articles list',
    description: 'Return article list, can be provided query: [order, page, take, search, category]',
  })
  @ApiOkResponse({ type: PageDto<ArticleResponseDto, PageMetaDtoArticles> })
  @ApiInternalServerErrorResponse({ type: ResponseDto })
  async getArticles(@Query() pageOptionsDto: PageOptionsArticlesDto): Promise<PageDto<ArticleResponseDto, PageMetaDtoArticles>> {
    return await this._articleService.getArticles(pageOptionsDto);
  }

  @SkipAuth()
  @Get(':id')
  @ApiOperation({
    summary: 'Get article by ID',
    description: 'Return article by ID',
  })
  @ApiOkResponse({ type: ArticleResponseDto })
  @ApiNotFoundResponse({ type: ResponseDto })
  @ApiInternalServerErrorResponse({ type: ResponseDto })
  async getArticle(@Param('id') id: number): Promise<ArticleResponseDto> {
    return await this._articleService.getArticle(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update article by ID',
    description: 'Update article by ID',
  })
  @ApiOkResponse({ type: ArticleResponseDto })
  @ApiBadRequestResponse({ type: ResponseDto })
  @ApiNotFoundResponse({ type: ResponseDto })
  @ApiInternalServerErrorResponse({ type: ResponseDto })
  async updateArticle(@Param('id') id: number, @Body() body: ArticleRequestDto): Promise<ArticleResponseDto> {
    return await this._articleService.update(id, body);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create article by ID',
    description: 'Create article by ID',
  })
  @ApiCreatedResponse({ type: ArticleResponseDto })
  @ApiBadRequestResponse({ type: ResponseDto })
  @ApiNotFoundResponse({ type: ResponseDto })
  @ApiInternalServerErrorResponse({ type: ResponseDto })
  async createArticle(@Body() body: ArticleRequestDto): Promise<ArticleResponseDto> {
    return await this._articleService.create(body);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete article by ID',
    description: 'Delete article by ID',
  })
  @ApiCreatedResponse({ type: Boolean })
  @ApiNotFoundResponse({ type: ResponseDto })
  @ApiInternalServerErrorResponse({ type: ResponseDto })
  async deleteArticle(@Param('id') id: number): Promise<boolean> {
    return await this._articleService.delete(id);
  }
}
