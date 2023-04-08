import { Request, Response, NextFunction } from 'express';

import { Service } from '@/contracts';

export async function middlewareAdapter(
  req: Request,
  res: Response,
  next: NextFunction,
  service: Service
) {
  try {
    const result = await service.handle({ ...req.body, ...req.headers });

    if (result.status === 200) {
      Object.assign(req, result.body);
    } else {
      return res.status(result.status).json(result.body);
    }

    next();
  } catch (error) {
    logger.fatal(error);

    return res.status(500).send('Internal server error');
  }
}
