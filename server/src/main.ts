import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: 'http://localhost:3000' // Allow your frontend origin
  })
  const config = new DocumentBuilder()
    .setTitle('FreelanceHub API')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-docs', app, document) // 'api-docs' is the path where Swagger UI will be served

  await app.listen(process.env.PORT ?? 5000)
}
bootstrap()
  .then(() => console.log(`App running on port:${process.env.PORT ?? 5000}`))
  .catch((err) => console.error(err))
