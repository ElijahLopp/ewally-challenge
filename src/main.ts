import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const prefix = 'api';
  app.setGlobalPrefix(prefix);

  const port = 3000;
  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}/${prefix}`);
  });
}
bootstrap();
