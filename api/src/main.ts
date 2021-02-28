import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    morgan(
      'HTTP/:http-version :method :url with status :status in :response-time ms - :user-agent',
      {
        stream: { write: (str: string) => logger.log(str) },
      },
    ),
  );

  app.listen(80, () => logger.log(`App running on port ${80}`));
}
bootstrap();
