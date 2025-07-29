import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  });
  app.useLogger(app.get(Logger));
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: ['http://localhost:4000', 'http://localhost:5173'],
    credentials: true,
  });

  app.use(cookieParser());

  await app.listen(process.env.PORT, '0.0.0.0');
}

bootstrap();
