import { Module } from '@nestjs/common';
import { AppController } from '@controllers/app.controller';
import { AppService } from '@services/app.service';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';
import { AuthGuard } from '@guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ArticleService } from '@services/article.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10m' },
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AppService,
    ArticleService,
  ],
})
export class AppModule {}
