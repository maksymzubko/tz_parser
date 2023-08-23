import { Injectable } from '@nestjs/common';
import * as Parser from 'rss-parser';
import { Cron } from "@nestjs/schedule";

@Injectable()
export class ArticleService {
  private readonly parser;
  constructor() {
    this.parser = new Parser();
  }
  @Cron('30 * * * * *')
  async parse(): Promise<any> {
    // console.log((await this.parser.parseURL('https://www.rbc.ua/static/rss/ukrnet.strong.ukr.rss.xml')).items);
  }
}
