import {
  AddProductToCartService,
  RemoveProductFromCartService,
  CheckoutService
} from '@/services';
import {
  CartMongoRepository,
  ProductMongoRepository,
  UserMongoRepository,
  PurchaseMongoRepository
} from '@/infra/db';
import { AuthMiddleware } from '@/middlewares';
import { JwtProvider, PagarmeProvider } from '@/providers';

const makeAuthMiddleware = () => {
  const jsonwebtoken = new JwtProvider();

  return new AuthMiddleware(jsonwebtoken);
};

const makeAddProductToCartService = () => {
  const cartRepository = new CartMongoRepository();
  const productMongoRepository = new ProductMongoRepository();

  return new AddProductToCartService(cartRepository, productMongoRepository);
};

const makeCheckoutService = () => {
  const cartMongoRepository = new CartMongoRepository();
  const userMongoRepository = new UserMongoRepository();
  const purchaseMongoRepository = new PurchaseMongoRepository();
  const pagarme = new PagarmeProvider();

  return new CheckoutService(
    pagarme,
    cartMongoRepository,
    userMongoRepository,
    purchaseMongoRepository
  );
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
  },
  {
    method: 'post',
    path: '/cart/checkout',
    middleware: makeAuthMiddleware(),
    handler: makeCheckoutService()
  }
];
