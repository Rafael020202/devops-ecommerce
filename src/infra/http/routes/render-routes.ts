import express, { Router, Request, Response } from 'express';

import { routeAdapter, middlewareAdapter } from '@/infra/http';
import { userRoutes } from './';

const rendered = [...userRoutes];
const routes = express.Router();

routes.use(express.json());

export const renderRoutes = (): Router => {
  for (const route of rendered) {
    if (route.middleware) {
      routes[route.method](
        route.path,
        (req, res, next) => middlewareAdapter(req, res, next, route.middleware),
        (req: Request, res: Response) => routeAdapter(req, res, route.handler)
      );
    } else {
      routes[route.method](route.path, (req: Request, res: Response) =>
        routeAdapter(req, res, route.handler)
      );
    }
  }

  return routes;
};
