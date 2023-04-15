import { Middleware, HttpResponse, Jwt } from '@/contracts';
import { success, unauthorized, badRequest } from '@/helpers';

export class AuthMiddleware implements Middleware {
  constructor(private jwt: Jwt) {}

  async handle(request: AuthMiddleware.Request): Promise<HttpResponse> {
    const { authorization } = request;
    try {
      if (!authorization) {
        return unauthorized('token obrigatório.');
      }

      const [, token] = authorization.split('Bearer ');
      const payload = this.jwt.verifyToken(token);

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
