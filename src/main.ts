import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from '@filters/exception-filter';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');
  app.use(json({ limit: '10mb' }));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new AllExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle('test-api')
    .setVersion('0.0.0')
    .setDescription('This api using in Test applications')
    .setContact('Zubko Maksim', 'https://t.me/maksimzubko', 'makzzubko66@gmail.com')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1/swagger', app, document);

  await app.listen(3000);
}

bootstrap();
