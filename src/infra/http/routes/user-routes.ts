import { CreateUserService, SignInService } from '@/services';
import { BcryptProvider, JwtProvider } from '@/providers';
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
  }
];
