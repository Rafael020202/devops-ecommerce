import { CreateUserService, SignInService } from '@/services';
import { BcryptProvider, JwtProvider } from '@/providers';
import { AuthMiddleware } from '@/middlewares';

import { UserMongoRepository } from '@/infra/db';

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

const authMiddleware = new AuthMiddleware();

export const userRoutes = [
  {
    method: 'post',
    path: '/user',
    middleware: authMiddleware,
    handler: makeCreateUserService()
  },
  {
    method: 'post',
    path: '/signin',
    handler: makeSignUpService()
  }
];
