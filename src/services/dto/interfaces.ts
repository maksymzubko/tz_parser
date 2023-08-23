import { PageOptionsArticlesDto } from '@services/dto/article/page-options.dto';

export interface PageMetaArticleDtoParameters {
  pageOptionsDto: PageOptionsArticlesDto;
  itemCount: number;
}

export interface RssData {
  title: string;
  link: string;
  pubDate: string;
  creator: string | null;
  author: string | null;
  'content:encoded': string;
  'content:encodedSnippet': string;
  enclosure: { url: string; type: string; length: number };
  content: string;
  contentSnippet: string;
  guid: string;
  categories: string[];
  isoDate: string;
}
