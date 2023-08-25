import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitEntities1692790490883 implements MigrationInterface {
  name = 'InitEntities1692790490883';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "articles" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "source_link" integer NOT NULL, "date" bigint NOT NULL, "content" character varying NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "articles_categories_categories" ("articlesId" integer NOT NULL, "categoriesId" integer NOT NULL, CONSTRAINT "PK_d99e5b5140f980c6e7b63fc1f16" PRIMARY KEY ("articlesId", "categoriesId"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_9c28108e84d0948e9567d29e40" ON "articles_categories_categories" ("articlesId") `);
    await queryRunner.query(`CREATE INDEX "IDX_d69c4c523152c22941ed15738b" ON "articles_categories_categories" ("categoriesId") `);
    await queryRunner.query(
      `ALTER TABLE "articles_categories_categories" ADD CONSTRAINT "FK_9c28108e84d0948e9567d29e400" FOREIGN KEY ("articlesId") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "articles_categories_categories" ADD CONSTRAINT "FK_d69c4c523152c22941ed15738ba" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "articles_categories_categories" DROP CONSTRAINT "FK_d69c4c523152c22941ed15738ba"`);
    await queryRunner.query(`ALTER TABLE "articles_categories_categories" DROP CONSTRAINT "FK_9c28108e84d0948e9567d29e400"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_d69c4c523152c22941ed15738b"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_9c28108e84d0948e9567d29e40"`);
    await queryRunner.query(`DROP TABLE "articles_categories_categories"`);
    await queryRunner.query(`DROP TABLE "articles"`);
    await queryRunner.query(`DROP TABLE "categories"`);
  }
}
