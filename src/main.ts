import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,//transformation des elts en le type voulu
    whitelist : true, //blocage des elts non souhaités
    forbidNonWhitelisted : true //lever une exception à cause des data invalid
  }));
  await app.listen(3000);
}
bootstrap();
