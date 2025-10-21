import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { configDotenv } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { DEFAULT_PORT } from './common/constants/global';

configDotenv();
const configService = new ConfigService();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    origin: configService.get('appOrigin'), // Allow your frontend origin
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  const config = new DocumentBuilder()
    .setTitle('FreelanceHub API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // 'api-docs' is the path where Swagger UI will be served

  await app.listen(configService.get('port') ?? DEFAULT_PORT);
}
bootstrap()
  .then(() =>
    console.log(
      `App running on port:${configService.get('port') ?? DEFAULT_PORT}`,
    ),
  )
  .catch((err) => console.error(err));
