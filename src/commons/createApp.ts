import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '../app.module';
import { useContainer } from 'class-validator';
import { HttpExceptionFilter } from '../exceptionFilter';
import cookieParser = require('cookie-parser');

export const createApp = (app: INestApplication): INestApplication => {
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidUnknownValues: false,
      stopAtFirstError: true,
      exceptionFactory: (errors) => {
        const errorsForResponse = [];
        errors.forEach((e) => {
          const constraintsKeys = Object.keys(e.constraints);
          constraintsKeys.forEach((ckey) => {
            errorsForResponse.push({
              message: e.constraints[ckey],
              field: e.property,
            });
          });
        });
        throw new BadRequestException(errorsForResponse);
      },
    }),
  );
  app.enableCors({
    origin: 'https://classy-naiad-2842bd.netlify.app',
    allowedHeaders: 'Content-Type, Authorization',
    methods: 'GET, PUT, POST, DELETE, OPTIONS',
    credentials: true,
    // preflightContinue: true,
    optionsSuccessStatus: 204,
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  const config = new DocumentBuilder()
    .setTitle('Pokemon example')
    .setDescription('Pokemon API description')
    .setVersion('1.0')
    .addTag('Pokemon')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  return app;
};
