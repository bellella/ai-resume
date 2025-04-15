import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:3000'],
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

  await app.listen(3001);
}
bootstrap();
