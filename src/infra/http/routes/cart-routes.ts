import { AddToCartService } from '@/services';
import { CartMongoRepository } from '@/infra/db';
import { AuthMiddleware } from '@/middlewares';
import { JwtProvider } from '@/providers';

const makeAuthMiddleware = () => {
  const jsonwebtoken = new JwtProvider();

  return new AuthMiddleware(jsonwebtoken);
};

const makeAddToCartService = () => {
  const cartRepository = new CartMongoRepository();

  return new AddToCartService(cartRepository);
};

export const cartRoutes = [
  {
    method: 'patch',
    path: '/cart',
    middleware: makeAuthMiddleware(),
    handler: makeAddToCartService()
  }
];
