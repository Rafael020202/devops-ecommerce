import {
  CreateUserService,
  SignInService,
  UpdateUserAddressService
} from '@/services';
import { BcryptProvider, JwtProvider } from '@/providers';
import { UserMongoRepository } from '@/infra/db';
import { AuthMiddleware } from '@/middlewares';

const makeCreateUserService = () => {
  const userRepository = new UserMongoRepository();
  const bcrypt = new BcryptProvider();

  const createUserService = new CreateUserService(userRepository, bcrypt);

  return createUserService;
};

const makeSignUpService = () => {
  const userRepository = new UserMongoRepository();
  const bcrypt = new BcryptProvider();
  const jsonwebtoken = new JwtProvider();

  const signInService = new SignInService(userRepository, bcrypt, jsonwebtoken);

  return signInService;
};

const makeUpdateUserAddressService = () => {
  const userRepository = new UserMongoRepository();

  return new UpdateUserAddressService(userRepository);
};

const makeAuthMiddleware = () => {
  const jsonwebtoken = new JwtProvider();

  return new AuthMiddleware(jsonwebtoken);
};

export const userRoutes = [
  {
    method: 'post',
    path: '/user',
    handler: makeCreateUserService()
  },
  {
    method: 'post',
    path: '/signin',
    handler: makeSignUpService()
  },
  {
    method: 'patch',
    path: '/user/address',
    handler: makeUpdateUserAddressService(),
    middleware: makeAuthMiddleware()
  }
];
