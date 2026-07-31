import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }))
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('MirPlat.form API')
    .build();
  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, config))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
