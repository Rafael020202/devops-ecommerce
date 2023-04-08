import jwt, { JwtPayload } from 'jsonwebtoken';

import env from '@/config/env';
import { Jwt } from '@/contracts';

export class JwtProvider implements Jwt {
  sigin(payload: any): string {
    return jwt.sign(payload, env.jwt_secret, { expiresIn: '1d' });
  }

  verifyToken(token: string): JwtPayload {
    return <any>jwt.verify(token, env.jwt_secret);
  }
}
