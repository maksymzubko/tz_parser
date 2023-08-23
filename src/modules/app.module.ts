import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';
import { ScheduleModule } from '@nestjs/schedule';
import { ArticleModule } from '@modules/article.module';
import { CategoryModule } from '@modules/category.module';
import { AdminModule } from '@modules/admin.module';
import { DatabaseModule } from '@database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@modules/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10m' },
    }),
    ScheduleModule.forRoot(),
    ArticleModule,
    CategoryModule,
    AdminModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
