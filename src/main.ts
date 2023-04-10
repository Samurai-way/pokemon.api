import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { createApp } from './commons/createApp';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { INestApplication } from '@nestjs/common';

const PORT = process.env.PORT || 3000;

const origin = ['https://pokemon-api-hazel-delta.vercel.app/api'];

const getCorsOptions = (origin: string[]): CorsOptions => ({
  origin,
  // credentials: true,
});

export const corseSetup = (app: INestApplication) => {
  app.enableCors(getCorsOptions(origin));
};

async function start() {
  const rawApp = await NestFactory.create(AppModule);
  const app = createApp(rawApp);
  corseSetup(app);
  await app.listen(PORT, () => {
    console.log(`[nest main] -> server started on http://localhost:${PORT}`);
  });
}

start();
