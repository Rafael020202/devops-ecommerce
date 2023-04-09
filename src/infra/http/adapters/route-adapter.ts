import { Request, Response } from 'express';

import { Service } from '@/contracts';

export async function routeAdapter(
  req: Request,
  res: Response,
  service: Service
) {
  try {
    const result = await service.handle({
      ...req.body,
      ...req.params,
      user_id: req.user_id
    });

    return res.status(result.status).json(result.body);
  } catch (error) {
    logger.fatal(error);

    return res.status(500).send('Internal server error');
  }
}
