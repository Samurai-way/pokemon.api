import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { createApp } from './commons/createApp';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { INestApplication } from '@nestjs/common';

const PORT = process.env.PORT || 3000;

// const origin = ['*'];

// const getCorsOptions = (origin: string[]): CorsOptions => ({
//   origin,
// });
//
// export const corseSetup = (app: INestApplication) => {
//   app.enableCors(getCorsOptions(origin));
// };
const origin = [
  'http://localhost:3001',
  'https://classy-naiad-2842bd.netlify.app',
  'https://pokemon-api-hazel-delta.vercel.app',
];
async function start() {
  const rawApp = await NestFactory.create(AppModule, {
    cors: {
      origin: origin,
      allowedHeaders: 'Content-Type,Authorization',
      methods: 'GET,PUT,POST,DELETE,OPTIONS',
      credentials: true,
    },
  });
  const app = createApp(rawApp);
  await app.listen(PORT, () => {
    console.log(`[nest main] -> server started on http://localhost:${PORT}`);
  });
}

start();
