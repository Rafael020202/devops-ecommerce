import {
  AddProductToCartService,
  RemoveProductFromCartService
} from '@/services';
import { CartMongoRepository, ProductMongoRepository } from '@/infra/db';
import { AuthMiddleware } from '@/middlewares';
import { JwtProvider } from '@/providers';

const makeAuthMiddleware = () => {
  const jsonwebtoken = new JwtProvider();

  return new AuthMiddleware(jsonwebtoken);
};

const makeAddProductToCartService = () => {
  const cartRepository = new CartMongoRepository();
  const productMongoRepository = new ProductMongoRepository();

  return new AddProductToCartService(cartRepository, productMongoRepository);
};

const makeRemoveProductFromCartService = () => {
  const cartRepository = new CartMongoRepository();

  return new RemoveProductFromCartService(cartRepository);
};

export const cartRoutes = [
  {
    method: 'patch',
    path: '/cart/product/:product_id',
    middleware: makeAuthMiddleware(),
    handler: makeAddProductToCartService()
  },
  {
    method: 'delete',
    path: '/cart/product/:product_id',
    middleware: makeAuthMiddleware(),
    handler: makeRemoveProductFromCartService()
  }
];
