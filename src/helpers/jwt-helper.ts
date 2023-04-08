import jwt, { JwtPayload } from 'jsonwebtoken';

import env from '@/config/env';

export const sigin = (payload: any): string =>
  jwt.sign(payload, env.jwt_secret, { expiresIn: '1d' });

export const verifyToken = (token: string): JwtPayload =>
  <any>jwt.verify(token, env.jwt_secret);
