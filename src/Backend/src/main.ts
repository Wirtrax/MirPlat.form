import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    //forbidNonWhitelisted: true,
    transform: true,
  }));
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('MirPlat.form API')
    .addBearerAuth({
      type: "http",
      bearerFormat:"JWT"
    }, 'jwt')
    .addBearerAuth({
      type: "http",
      bearerFormat:"initData"
    }, "tma")
    .build();
  SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, config))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
