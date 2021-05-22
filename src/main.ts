//import { MorganMiddleware } from '@nest-middlewares/morgan';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middlewares/logger.middleware';

import * as dotenv from 'dotenv';

import * as morgan from 'morgan';
import { DurationInterceptor } from './interceptors/duration.interceptor';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const corsOptions ={
    origin : ['http://localhst:4200']
  }
  app.enableCors( corsOptions);
  app.use(morgan('dev'));
  app.use(logger
    /*() => {
      (req: Request, res: Response, next) => {
        console.log('Middleware form app.use');
        //next();
      }
    }*/
  )
  app.useGlobalInterceptors(new DurationInterceptor());
  app.useGlobalPipes(new ValidationPipe({
    transform: true,//transformation des elts en le type voulu
    whitelist : true, //blocage des elts non souhaités
    forbidNonWhitelisted : true //lever une exception à cause des data invalid
  }));
  await app.listen(process.env.APP_PORT);
}
bootstrap();
