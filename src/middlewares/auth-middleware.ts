import { Middleware, HttpResponse } from '@/contracts';
import { verifyToken, success, unauthorized, badRequest } from '@/helpers';

export class AuthMiddleware implements Middleware {
  async handle(request: AuthMiddleware.Request): Promise<HttpResponse> {
    const { authorization } = request;
    try {
      if (!authorization) {
        return unauthorized('Token obrigatório.');
      }

      const [, token] = authorization.split('Bearer ');
      const payload = verifyToken(token);

      return success({ user_id: payload.user_id });
    } catch (error) {
      return badRequest('Token inválido.');
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    authorization: string;
  };
}
