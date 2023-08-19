import { NestFactory } from '@nestjs/core'
import { AppModule } from './App.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const PORT = process.env.PORT || 5001
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Recipes')
    .setDescription('The recipes API description')
    .setVersion('1.0')
    .addTag('recipes')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)
    app.enableCors({
    origin: "*"
  })
  
  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}

bootstrap()
