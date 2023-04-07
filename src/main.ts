import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { createApp } from './commons/createApp';

const PORT = process.env.PORT || 3000;

async function start() {
  const rawApp = await NestFactory.create(AppModule);
  const app = createApp(rawApp);
  await app.listen(PORT, () => {
    console.log(`[nest main] -> server started on http://localhost:${PORT}`);
  });
}

start();
