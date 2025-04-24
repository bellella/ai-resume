import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const port = process.env.PORT || 3001;

  // Enable CORS
  app.enableCors({
    origin: process.env.NODE_ENV === 'production' ? process.env.WEB_URL : ['http://localhost:3000'],
    credentials: true,
  });

  // Set global API prefix
  app.setGlobalPrefix('api');

  // Enable validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        console.log('Validation errors:', errors);
        return errors;
      },
    })
  );

  await app.listen(port);
  console.log(`🚀 Server listening on port ${port}`);
}
bootstrap();
