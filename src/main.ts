import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { createApp } from './commons/createApp';

const PORT = process.env.PORT || 3000;

async function start() {
  const rawApp = await NestFactory.create(AppModule, { cors: true });
  const app = createApp(rawApp);
  // app.use((req, res, next) => {
  //   res.setHeader('Access-Control-Allow-Origin', '*');
  //   res.setHeader(
  //     'Access-Control-Allow-Headers',
  //     'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  //   );
  //   res.setHeader(
  //     'Access-Control-Allow-Methods',
  //     'GET, POST, PUT, DELETE, OPTIONS',
  //   );
  //   // check if the request is a preflight request
  //   if (req.method === 'OPTIONS') {
  //     res.status(204).end();
  //   } else {
  //     next();
  //   }
  // });

  await app.listen(PORT, () => {
    console.log(`[nest main] -> server started on http://localhost:${PORT}`);
  });
}

start();
