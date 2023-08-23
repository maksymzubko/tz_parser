import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixArticleTable1692797218407 implements MigrationInterface {
  name = 'FixArticleTable1692797218407';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "source_link"`);
    await queryRunner.query(`ALTER TABLE "articles" ADD "source_link" character varying NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "source_link"`);
    await queryRunner.query(`ALTER TABLE "articles" ADD "source_link" integer NOT NULL`);
  }
}
