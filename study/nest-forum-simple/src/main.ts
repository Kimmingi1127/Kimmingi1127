import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import * as exphbs from 'express-handlebars';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // transform payload objects to dto objects
    }),
  );

  // Handlebars 뷰엔진 설정
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.engine(
    'hbs',
    exphbs.engine({
      extname: 'hbs',
      layoutsDir: join(__dirname, '..', 'views', 'layouts'),
      defaultLayout: 'main',
      helpers: {
        inc: (v) => Number(v) + 1,
        dec: (v) => Number(v) - 1,
        gt: (a, b) => Number(a) > Number(b),
        lt: (a, b) => Number(a) < Number(b),
      },
    }),
  );
  app.setViewEngine('hbs');

  await app.listen(process.env.PORT || 3000);
  console.log(`http://localhost:${process.env.PORT || 3000}`);
}
void bootstrap();
