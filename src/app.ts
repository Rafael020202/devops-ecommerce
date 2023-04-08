import express from 'express';
import cors from 'cors';
import { pino } from 'pino';
import pretty from 'pino-pretty';

import { renderRoutes } from '@/infra/http';
import env from '@/config/env';

const stream = pretty({
  colorize: true
});

(<any>global).logger = pino(stream);

const initApp = (): any => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  const routes = renderRoutes();

  app.use(routes);

  return app.listen(env.port, () =>
    logger.info(`application running on ${env.port}`)
  );
};

export default initApp;
